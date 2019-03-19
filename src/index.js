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
// import { register as registerServiceWorker } from './serviceWorker'

import MainMenuScene from './components/MainMenuScene'
import GameScene from './components/GameScene'
import EditorScene from './components/EditorScene'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={MainMenuScene} />
        <Route exact path="/game" component={GameScene} />
        <Route exact path="/editor" component={EditorScene} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
  
// registerServiceWorker()
