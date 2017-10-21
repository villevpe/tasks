import { Store } from 'react-redux'
import { createStore } from 'redux'
import rootReducer, { State } from './reducers'

const debounce = require('debounce')

const SAVE_STATE_DEBOUNCE_MS = 300
const SAVE_STATE_KEY = 'tasksState'

type StoreState = State.Store | {}

const Storage = {
    _get: (key: string = SAVE_STATE_KEY): string => localStorage.getItem(key),
    _has: (key: string = SAVE_STATE_KEY): boolean => !!localStorage[key],
    _set: (state: StoreState) => localStorage.setItem(SAVE_STATE_KEY, JSON.stringify(state)),
    save: (state: StoreState) => debounce(Storage._set.bind(null, state), SAVE_STATE_DEBOUNCE_MS)(),
    load: (): StoreState => Storage._has() ? JSON.parse(Storage._get()) : {}
}

let store: Store<StoreState> = createStore(rootReducer, Storage.load())

store.subscribe(() => {
    Storage.save(store.getState())
})

export default store
