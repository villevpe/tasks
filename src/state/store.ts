import { Store } from 'react-redux'
import { createStore } from 'redux'
import { Application } from './index'
import { Storage } from './utils/storage'

const mainStore: Store<{}> = initStore()

export default mainStore

function initStore(): Store<{}> {
  const storage = new Storage<Application.Store | {}>('tasksState')
  let store = createStore(Application.Reducer, storage.load())
  store.subscribe(() => storage.save(store.getState()))
  return store
}
