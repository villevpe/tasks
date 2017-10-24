import { Action as ReduxAction } from 'redux'
import taskReducer from './reducer'
import { setVisibilityFilter } from './actions'

export namespace Filters {

  export enum ActionTypes {
    SetVisibilityFilter = 'SetVisibilityFilter'
  }

  export enum Types {
    ShowCompleted = 'ShowCompleted',
    ShowAll = 'ShowAll',
    ShowActive = 'ShowActive'
  }

  export type State = {
    filter: Filters.Types
  }

  export interface Action extends ReduxAction {
    type: Filters.ActionTypes
    payload: Filters.State
  }

  export const Actions = {
    setVisibilityFilter
  }

  export const Reducer = taskReducer
}
