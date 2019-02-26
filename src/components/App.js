import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppMenu from './AppMenu'
import World from './World'
import NewGameMenu from './NewGameMenu'

import './App.css'

class App extends Component {

  render() {
    const { worldMap } = this.props

    return (
      <div className="App relative">
        {worldMap ? <World /> : <NewGameMenu />}
        <AppMenu />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(App)
