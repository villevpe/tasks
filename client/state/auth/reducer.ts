import { Reducer } from 'redux'
import { Auth } from './index'

const initialState: Auth.State = {
    isInitialized: false,
    isAuthenticated: false,
    isAuthenticating: false,
    isInitializing: false
}

const reducer: Reducer<Auth.State> = (state = initialState, action: Auth.Action): Auth.State => {

    if (Object.values(Auth.ActionTypes).includes(action.type)) {
        return {
            ...state,
            ...action.payload
        }
    }
    return state
}

export default reducer
