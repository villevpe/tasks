import { Action as ReduxAction } from 'redux'
import modalReducer from './reducer'
import { openAddTaskModal, closeModal, openEditModal } from './actions'
import { Tasks } from '../tasks'

export namespace Modal {

  export enum ActionTypes {
    ShowModal = 'ShowModal',
    HideModal = 'HideModal'
  }

  export enum Types {
    AddTask = 'AddTask',
    EditTask = 'EditTask'
  }

  export type State = {
    modalType: Modal.Types
    modalProps: {
        header: string,
        task?: Tasks.Task
    }
  }

  export interface Action extends ReduxAction {
    type: Modal.ActionTypes
    payload: Modal.State
  }

  export const Actions = {
    openAddTaskModal,
    openEditModal,
    closeModal
  }

  export const Reducer = modalReducer
}
