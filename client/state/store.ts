import { Store } from 'react-redux'
import { createStore, StoreEnhancer } from 'redux'
import { Application } from './index'
import { Storage } from './utils/storage'

const store: Store<{}> = initStore()

interface WindowWithDevTools extends Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<{}>
}

export { store }

function initStore(): Store<{}> {
    const storage = new Storage<Application.Store | {}>('tasksState')

    const devTool =  typeof window !== 'undefined' && (window as WindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION__

    const newStore = createStore(
        Application.Reducer,
        storage.load(),
        devTool ? devTool() : undefined
    )

    newStore.subscribe(() => {
        storage.save(newStore.getState())
    })
    return newStore
}
