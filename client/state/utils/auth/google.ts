import { AuthProvider } from './provider'
import { GoogleApi, GoogleAuthenticationInstance, GoogleErrorResponse, WindowWithGoogleApi } from '../types/google'

// https://developers.google.com/identity/protocols/OAuth2UserAgent
// https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions

const GOOGLE_API_URL = 'https://apis.google.com/js/api.js'

export interface GoogleAuthOptions {
    apiURL?: string
    apiKey: string
    clientId: string
    scope: string
    discoveryDocs: string[]
}

export class GoogleAuth implements AuthProvider {
    private gapi: GoogleApi
    private auth: GoogleAuthenticationInstance

    private apiURL: string
    private apiKey: string
    private clientId: string
    private scope: string
    private discoveryDocs: string[]

    constructor({ apiKey, apiURL = GOOGLE_API_URL, clientId, scope, discoveryDocs }: GoogleAuthOptions) {
        this.gapi = null
        this.apiURL = apiURL
        this.apiKey = apiKey
        this.clientId = clientId
        this.scope = scope
        this.discoveryDocs = discoveryDocs
    }

    get api() {
        return this.gapi
    }

    get isSignedIn() {
        return this.auth && this.auth.isSignedIn.get()
    }

    get user() {
        return this.auth && this.auth.currentUser.get()
    }

    initialize() {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = this.apiURL
            script.async = true
            script.onload = () => {
                this.initGoogleAuth()
                    .then(resolve, reject)
            }
            document.body.appendChild(script)
        })

    }

    login() {
        if (!this.auth) {
            throw new Error('Google API is not initialized yet')
        }
        if (this.isSignedIn) {
            return Promise.resolve()
        }
        return this.auth
            .signIn()
            .then(() => Promise.resolve())
            .catch((errorResponse: GoogleErrorResponse) => {
                console.error(errorResponse)
                return Promise.reject(errorResponse.error)
            })
    }

    logout() {
        if (!this.auth) {
            throw new Error('Google API is not initialized yet')
        }
        if (this.isSignedIn) {
            return this.auth
                .signOut()
                .then(() => Promise.resolve())
                .catch((errorResponse: GoogleErrorResponse) => {
                    console.error(errorResponse)
                    return Promise.reject(errorResponse.error)
                })
        }
        return Promise.resolve()
    }

    private async initGoogleAuth() {
        return new Promise<void>((resolve, reject) => {
            this.gapi = (window as WindowWithGoogleApi).gapi
            const authOptions = {
                apiKey: this.apiKey,
                clientId: this.clientId,
                scope: this.scope,
                discoveryDocs: this.discoveryDocs
            }
            // Init google api and bind signIn listener to the auth2 api
            return this.gapi
                .load('client', () => {
                    this.gapi.client
                        .init(authOptions)
                        .then(() => {
                            this.auth = this.gapi.auth2.getAuthInstance()
                            this.auth.then(() => {
                                resolve()
                            })

                        })
                        .catch((errorResponse: GoogleErrorResponse) => {
                            console.error(errorResponse)
                            reject(errorResponse.error)
                        })
                })
        })
    }
}
