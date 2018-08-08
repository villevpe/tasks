import { Action as ReduxAction } from 'redux'
import {
    receiveInit,
    receiveLogin,
    receiveLogout,
    requestInit,
    requestLogin,
    requestLogout,
    initError,
    loginError,
    logoutError
} from './actions'
import authReducer from './reducer'

export namespace Auth {

    export enum ActionTypes {
        InitRequest = 'InitRequest',
        InitSuccess = 'InitSuccess',
        InitFailure = 'InitFailure',

        LoginRequest = 'LoginRequest',
        LoginSuccess = 'LoginSuccess',
        LoginFailure = 'LoginFailure',

        LogoutRequest = 'LogoutRequest',
        LogoutSuccess = 'LogoutSuccess',
        LogoutFailure = 'LogoutFailure'
    }

    export enum ErrorType {
        Init = 'init',
        Login = 'login',
        Logout = 'logout'
    }

    export type State = {
        isInitializing?: boolean,
        isInitialized?: boolean,
        isAuthenticating?: boolean,
        isAuthenticated: boolean,
        error?: boolean
        errorType?: ErrorType
    }

    export interface Action extends ReduxAction {
        type: ActionTypes
        payload: State
    }

    export const Actions = {
        receiveInit,
        receiveLogin,
        receiveLogout,
        requestInit,
        requestLogin,
        requestLogout,
        initError,
        loginError,
        logoutError
    }

    export const Reducer = authReducer
}
