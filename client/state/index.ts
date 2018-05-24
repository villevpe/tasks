import { combineReducers } from 'redux'
import { Tasks } from './tasks'
import { Filters } from './filters'
import { Modal } from './modal'
import { Auth } from './auth'
import { Version } from './version'

export { Tasks, Modal, Filters, Auth }

export namespace Application {

  export type Store = {
    filters: Filters.State
    modal: Modal.State,
    tasks: Tasks.State,
    auth: Auth.State,
    version: Version.State
  }

  export const Reducer = combineReducers({
    filters: Filters.Reducer,
    modal: Modal.Reducer,
    tasks: Tasks.Reducer,
    auth: Auth.Reducer,
    version:  Version.Reducer
  })
}
