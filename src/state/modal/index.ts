import { Action as ReduxAction } from 'redux'
import modalReducer from './reducer'
import { openAddTaskModal, closeModal } from './actions'

export namespace Modal {

  export enum ActionTypes {
    ShowModal = 'ShowModal',
    HideModal = 'HideModal'
  }

  export enum Types {
    AddTask = 'AddTask'
  }

  export type State = {
    modalType: Modal.Types
    modalProps: {
        header: string
    }
  }

  export interface Action extends ReduxAction {
    type: Modal.ActionTypes
    payload: Modal.State
  }

  export const Actions = {
    openAddTaskModal,
    closeModal
  }

  export const Reducer = modalReducer
}
