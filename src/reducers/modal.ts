import { Actions, MODAL_ACTIONS } from '../actions'
import { Reducer } from 'redux'
import { State } from './index'

const initialState: State.Modal = {
    modalType: null,
    modalProps: {
        header: null
    }
}

const modal: Reducer<{}> = (state: State.Modal = initialState, action: Actions.Modal): State.Modal => {
    switch (action.type) {
        case MODAL_ACTIONS.SHOW_MODAL:
            return {
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps
            }
        case MODAL_ACTIONS.SHOW_MODAL:
            return initialState
        default:
            return state
    }
}

export default modal
