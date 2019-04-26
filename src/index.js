import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import './index.css'
import 'flexpad/dist/flexpad.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'

import checkVersion from './checkVersion'
import history from './history'
import store from './state/store'
import gameConfiguration from './lib/gameConfiguration'
// import { register as registerServiceWorker } from './serviceWorker'

import MainMenuScene from './components/MainMenuScene'
import GameScene from './components/GameScene'
import EditorScene from './components/EditorScene'
import CampaignMenuScene from './components/CampaignMenuScene'
import QuickPlayMenuScene from './components/QuickPlayMenuScene'
// import DevelopmentScene from './components/DevelopmentScene'
import NotFoundScene from './components/NotFoundScene'

// Flush the game state if the version's major has been bumped
checkVersion()

class App extends PureComponent {

  componentDidMount() {
    // Pre-load images
    const urls = Object.values(gameConfiguration.imageSources).reduce((a, b) => `${a} url(${b})`, '')

    document.styleSheets[0].addRule(
      'body:after',
      `content: ${urls};
      display: none;`
    )
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={MainMenuScene} />
            <Route exact path="/game" component={GameScene} />
            <Route exact path="/editor" component={EditorScene} />
            <Route exact path="/campaign" component={CampaignMenuScene} />
            <Route exact path="/quick_play" component={QuickPlayMenuScene} />
            {/* {process.env.NODE_ENV === 'development' && <Route exact path="/development" component={DevelopmentScene} />} */}
            <Route component={NotFoundScene} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// registerServiceWorker()
