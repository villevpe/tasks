import { Action as ReduxAction } from 'redux'
import taskReducer from './reducer'
import { setFilter, setListVisibility } from './actions'

export namespace Filters {

  export enum ActionTypes {
    SetFilter = 'SetFilter',
    SetListVisibility = 'ToggleFilterList'
  }

  export enum Types {
    ShowCompleted = 'ShowCompleted',
    ShowAll = 'ShowAll',
    ShowActive = 'ShowActive'
  }

  export type State = {
    filter?: Filters.Types,
    open?: boolean
  }

  export interface Action extends ReduxAction {
    type: Filters.ActionTypes
    payload: Filters.State
  }

  export const Actions = {
    setFilter,
    setListVisibility
  }

  export const Reducer = taskReducer
}
