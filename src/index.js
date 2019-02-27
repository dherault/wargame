import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import 'normalize.css'
import 'flexpad/dist/flexpad.min.css'
import './index.css'

import history from './history'
import store from './state/store'
import { register as registerServiceWorker } from './serviceWorker'

import Game from './components/Game'
import Editor from './components/Editor'
import AppMenu from './components/AppMenu'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/" component={Game} />
          <Route exact path="/editor" component={Editor} />
        </Switch>
        <AppMenu />
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
  
registerServiceWorker()
