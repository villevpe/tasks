import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './state/store'
import App from './components/App/App'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLElement
)
