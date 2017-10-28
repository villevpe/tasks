import { Reducer } from 'redux'
import { Modal } from './index'

const initialState: Modal.State = {
  modalType: null,
  modalProps: {
    header: null
  }
}

const reducer: Reducer<Modal.State> = (state = initialState, action: Modal.Action): Modal.State => {
  switch (action.type) {
    case Modal.ActionTypes.ShowModal:
      return action.payload
    case Modal.ActionTypes.HideModal:
      return {
        modalType: null,
        modalProps: state.modalProps
      }
    default:
      return initialState
  }
}

export default reducer
