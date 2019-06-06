import React from 'react'
import { connect, DispatchProp, Dispatch } from 'react-redux'
const debounce = require('debounce')
import { Application, Auth, Tasks, Filters } from '../../state'
import { Button } from '../Button/Button'
import { GoogleAuth, AuthProvider } from '../../state/utils/auth'
import './Auth.scss'
import { Icons } from '../Icon/Icon'
import { GoogleFileProvider } from '../../state/utils/file/googleDrive'
import { FileProvider } from '../../state/utils/file/provider'
import { GoogleApi } from '../../state/utils/types/google'
import { store, storage } from '../../state/store'
import { getEnvironmentVariable, Env } from '../../state/utils/environment'

type ConnectedAuth = Auth.State & DispatchProp<{}>

const dataFileName = 'tasks.json'

const getValueByConditions = <T extends {}>([...pairs]: [boolean, {}][], defaultValue: {}) => {
    return pairs
        .reduce((acc, [condition, value]) => {
            if (condition) {
                return value
            }
            return acc
        }, defaultValue) as T
}

class AuthComponent extends React.Component<ConnectedAuth> {
    private authProvider: AuthProvider
    private dispatch: Dispatch<{}>
    private fileProvider: FileProvider
    private fileId: string
    private syncInterval: number
    private doSync: boolean = false
    private lastState: Application.Store

    constructor(props: ConnectedAuth) {
        super(props)
        this.dispatch = this.props.dispatch
        this.uploadStateToRemote = debounce(this.uploadStateToRemote, 500)
    }

    componentDidMount() {
        this.authProvider = new GoogleAuth({
            apiKey: getEnvironmentVariable<string>(Env.GoogleApiKey),
            clientId: getEnvironmentVariable<string>(Env.GoogleClientID),
            scope: 'https://www.googleapis.com/auth/drive.appfolder',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
        })
        this.initAuth()
            .then(() => {
                store.subscribe(() => {
                    const state = store.getState() as Application.Store

                    // Save state to local storage
                    storage.save(state)

                    // Upload new state to google drive
                    if (this.doSync && this.isStateChanged(this.lastState, state)) {
                        this.uploadStateToRemote(state)
                    }
                    this.lastState = state
                })
            })
    }

    render() {
        const { isInitialized, isAuthenticated, isAuthenticating } = this.props

        const ready = isInitialized && !isAuthenticated && !isAuthenticating
        const active = isInitialized && isAuthenticated && !isAuthenticating

        const label = getValueByConditions<string>([
            [ready, 'Sync with Google Drive'],
            [active, 'Your tasks are synced to Google Drive. Tap to disable']
        ], 'Loading')

        const icon: Icons.Name = getValueByConditions<Icons.Name>([
            [ready, Icons.Name.CloudSet],
            [active, Icons.Name.CloudDone]
        ], Icons.Name.CloudOff)

        const action = getValueByConditions<() => void>([
            [ready, this.loginUser.bind(this)],
            [active, this.logoutUser.bind(this)]
        ], () => false)

        return (
            <Button
                className="auth-btn"
                label={label}
                icon={{ name: icon }}
                useDispatch={false}
                action={() => action()}
            />
        )
    }

    // Check if only the meaningful state has changed (i.e. tasks)
    private isStateChanged(last: Application.Store, current: Application.Store) {
        const checksum = ({ id, text, completed }: Tasks.Task) => [id, text, completed].join('')

        if (!last) {
            return false
        }
        return current.tasks.map(checksum).join('') !== last.tasks.map(checksum).join('')
    }

    private initAuth() {
        this.dispatch(Auth.Actions.requestInit())
        return this.authProvider
            .initialize()
            .then(() => this.dispatch(Auth.Actions.receiveInit()))
            .then(() => {
                if (this.authProvider.isSignedIn) {
                    this.doSync = true
                    this.createFileProvider()
                    this.dispatch(Auth.Actions.receiveLogin())
                    this.setStateFromRemoteData()
                    this.setAutoSync()
                }
            })
            .catch((error: Error) => {
                console.error(error)
                this.dispatch(Auth.Actions.initError())
            })
    }

    private createFileProvider() {
        this.fileProvider = new GoogleFileProvider(this.authProvider.api as GoogleApi)
    }

    private setStateFromRemoteData() {
        if (this.fileProvider) {
            this.findOrCreateRemoteData()
                .then(id => {
                    this.fileId = id
                    return this.fileProvider.downloadFile(id)
                })
                .then((data: Application.Store) => this.hydrateState(store.getState() as Application.Store, data))
                .catch(exception => {
                    console.error(exception)
                })
        }
    }

    private findOrCreateRemoteData(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.fileId) {
                return resolve(this.fileId)
            }
            return this.fileProvider
                .findFile(dataFileName)
                .then(file => {
                    if (file) {
                        resolve(file.id)
                    } else {
                        this.fileProvider
                            .createFile(dataFileName)
                            .then(id => this.fileProvider.uploadFile(id, store.getState()))
                            .then(newFile => resolve(newFile.id))
                    }
                })
        })
    }

    private hydrateState(localState: Application.Store, remoteState: Application.Store) {

        if (this.shouldUpdateState(localState, remoteState, true)) {
            console.info('Got fresher data from the server, hydrating tasks')
            const tasks = remoteState && remoteState.tasks
            if (tasks) {
                this.doSync = false
                this.dispatch(Tasks.Actions.setAllTasks(tasks))
                // Use local state for the filter because it would be odd if it would change
                this.dispatch(Filters.Actions.setFilter(localState.filters.filter))
                this.doSync = true
            }
        }
    }

    private setAutoSync(clear: boolean = false) {
        if (this.syncInterval) {
            clearInterval(this.syncInterval)
        }
        if (!clear) {
            this.syncInterval = window.setInterval(() => this.setStateFromRemoteData(), 10 * 1000)
        }
    }

    private uploadStateToRemote(state: Application.Store) {
        if (this.fileProvider) {
            this.findOrCreateRemoteData()
                .then(id => {
                    this.fileId = id
                    return this.fileProvider.downloadFile(id)
                })
                .then((remoteState: Application.Store) => {
                    if (this.shouldUpdateState(state, remoteState, false)) {
                        console.info('Uploading state')
                        return this.fileProvider.uploadFile(this.fileId, state)
                    }
                    return null
                })
        }
    }

    private shouldUpdateState(localState: Application.Store, remoteState: Application.Store, fromRemote: boolean) {

        if (!remoteState.version) {
            return fromRemote
        }

        if (this.isStateChanged(localState, remoteState)) {
            const local = new Date(localState.version.modifiedDate).getTime()
            const remote = new Date(remoteState.version.modifiedDate).getTime()

            if (fromRemote) {
                return remote > local
            } else {
                return local >= remote
            }
        }
        return !fromRemote
    }

    private loginUser() {
        this.dispatch(Auth.Actions.requestLogin())
        this.authProvider
            .login()
            .then(() => {
                this.doSync = true
                this.setAutoSync()
                if (!this.fileProvider) {
                    this.createFileProvider()
                }
            })
            .then(() => this.dispatch(Auth.Actions.receiveLogin()))
            .catch(() => this.dispatch(Auth.Actions.loginError()))
    }

    private logoutUser() {
        this.dispatch(Auth.Actions.requestLogout())
        this.authProvider
            .logout()
            .then(() => {
                this.doSync = false
                this.setAutoSync(false)
            })
            .then(() => this.dispatch(Auth.Actions.receiveLogout()))
            .catch(() => this.dispatch(Auth.Actions.logoutError()))
    }
}

const mapStateToProps = (state: Application.Store): Auth.State => ({
    isInitialized: state.auth.isInitialized,
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating
})

export const Authentication = connect(
    mapStateToProps
)(AuthComponent)
