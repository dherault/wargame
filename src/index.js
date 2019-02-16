import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import createNewGame from './lib/createNewGame'
// import registerServiceWorker from '.serviceWorker'
import App from './components/App'
import './index.css'
import './normalize.css'
import 'flexpad/dist/flexpad.min.css'

if (!store.getState().worldMap) {
  createNewGame()
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker()
