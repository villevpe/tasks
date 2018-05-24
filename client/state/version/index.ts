import { Action as ReduxAction } from 'redux'
import { updateVersion } from './actions'
import reducer from './reducer'

export namespace Version {
    export enum ActionTypes {
        Update = 'update'
    }

    export type State = {
        modifiedDate: Date
    }

    export interface Action extends ReduxAction {
        type: ActionTypes
        payload: State
    }

    export const Actions = {
        updateVersion
    }

    export const Reducer = reducer
}
