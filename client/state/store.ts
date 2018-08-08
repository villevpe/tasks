import thunk from 'redux-thunk'
import { createStore, StoreEnhancer, compose } from 'redux'
import { Application } from './index'
import { Storage } from './utils/storage'
import { applyMiddleware } from 'redux'

interface WindowWithDevTools extends Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<{}>
}

const storage = new Storage<Application.Store | {}>('tasksState')

const devTool = typeof window !== 'undefined'
    && (window as WindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION__
    && (window as WindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION__()

const enhancer: StoreEnhancer<{}> = compose(
    ...[applyMiddleware(thunk), devTool].filter(Boolean)
)

const store = createStore(
    // Root reducer
    Application.Reducer,
    // Initial state
    storage.load(),
    // Enhancers
    enhancer
)

export { store, storage }
