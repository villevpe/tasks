import { combineReducers } from 'redux'
import { Tasks } from './tasks'
import { Filters } from './filters'
import { Modal } from './modal'

export { Tasks, Modal, Filters }

export namespace Application {

  export type Store = {
    filters: Filters.State
    modal: Modal.State,
    tasks: Tasks.State
  }

  export const Reducer = combineReducers({
    filters: Filters.Reducer,
    modal: Modal.Reducer,
    tasks: Tasks.Reducer
  })
}
