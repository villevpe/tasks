import { Store } from 'react-redux'
import { createStore } from 'redux'
import { Application } from './index'
import { Storage } from './utils/storage'

const store: Store<{}> = initStore()

export { store }

function initStore(): Store<{}> {
  const storage = new Storage<Application.Store | {}>('tasksState')
  let newStore = createStore(Application.Reducer, storage.load())
  newStore.subscribe(() => storage.save(newStore.getState()))
  return newStore
}
