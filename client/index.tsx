import React from 'react'
import { hydrate } from 'react-dom'
import { store } from './state/store'
import { Provider } from 'react-redux'
import { App } from './components/App/App'

hydrate(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('app') as HTMLElement
)
