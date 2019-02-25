import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'normalize.css'
import 'flexpad/dist/flexpad.min.css'
import './index.css'

import store from './state/store'
import App from './components/App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
  
// import registerServiceWorker from '.serviceWorker'
// registerServiceWorker()
