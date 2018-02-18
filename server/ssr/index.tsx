import * as React from 'react'
import { Request, Response } from 'express'
import { createStore } from 'redux'
import { renderToNodeStream } from 'react-dom/server'
import { Provider } from 'react-redux'
import Html from './Html'
import { Application } from '../../client/state'
import { App } from '../../client/components/App/App'

/**
 * Express middleware to render the application in the server
 */
export function ssr(request: Request, response: Response) {

    /** Todo: fetch initial state here from somewhere else */
    const state = {}

    const store = createStore(Application.Reducer, state)

    renderToNodeStream(
        <Html>
            <Provider store={store}>
                <App />
            </Provider>
        </Html>
    ).pipe(response)
}
