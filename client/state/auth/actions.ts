import { Auth } from './index'

export const requestInit = (): Auth.Action => ({
    type: Auth.ActionTypes.InitRequest,
    payload: {
        isInitializing: true,
        isAuthenticating: false,
        isInitialized: false,
        isAuthenticated: false,
        error: false
    }
})

export const receiveInit = (): Auth.Action => ({
    type: Auth.ActionTypes.InitSuccess,
    payload: {
        isInitializing: false,
        isAuthenticating: false,
        isInitialized: true,
        isAuthenticated: false,
        error: false
    }
})

export const requestLogin = (): Auth.Action => ({
    type: Auth.ActionTypes.LoginRequest,
    payload: {
        isAuthenticated: false,
        isAuthenticating: true,
        error: false
    }
})

export const receiveLogin = (): Auth.Action => ({
    type: Auth.ActionTypes.LoginSuccess,
    payload: {
        isAuthenticated: true,
        isAuthenticating: false,
        error: false
    }
})

export const requestLogout = (): Auth.Action => ({
    type: Auth.ActionTypes.LogoutRequest,
    payload: {
        isAuthenticated: true,
        isAuthenticating: true,
        error: false
    }
})

export const receiveLogout = (): Auth.Action => ({
    type: Auth.ActionTypes.LogoutSuccess,
    payload: {
        isAuthenticated: false,
        isAuthenticating: false,
        error: false
    }
})

export const initError = (): Auth.Action => ({
    type: Auth.ActionTypes.InitFailure,
    payload: {
        isInitializing: false,
        isInitialized: false,
        isAuthenticated: false,
        isAuthenticating: false,
        error: true,
        errorType: Auth.ErrorType.Init
    }
})

export const loginError = (): Auth.Action => ({
    type: Auth.ActionTypes.LoginFailure,
    payload: {
        isAuthenticated: false,
        isAuthenticating: false,
        error: true,
        errorType: Auth.ErrorType.Login
    }
})

export const logoutError = (): Auth.Action => ({
    type: Auth.ActionTypes.LogoutFailure,
    payload: {
        isAuthenticated: false,
        isAuthenticating: false,
        error: true,
        errorType: Auth.ErrorType.Logout
    }
})
