import { Reducer } from 'redux'
import { Version } from './index'

const reducer: Reducer<Version.State> = (state = { modifiedDate: null }, action: Version.Action): Version.State => {

    switch (action.type) {
        case Version.ActionTypes.Update:
            return {
                modifiedDate: action.payload.modifiedDate
            }
        default:
            return {
                modifiedDate: state.modifiedDate
            }
    }
}

export default reducer
