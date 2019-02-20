import React, { Component } from 'react'
import Mousetrap from 'mousetrap'
import registerCanvas from '../lib/registerCanvas'

import AppMenu from './AppMenu'
import DevPanel from './DevPanel'
import FireInfo from './FireInfo'
import TileInfo from './TileInfo'
import TurnInfo from './TurnInfo'
import UnitMenu from './UnitMenu'

import './App.css'

class App extends Component {

  state = {
    devPanelOpened: process.env.NODE_ENV === 'development',
  }

  componentDidMount() {
    console.log('Mounting App', window.innerWidth, window.innerHeight)

    const canvas = document.getElementById('canvas')

    window.addEventListener('resize', () => this.resizeCanvas(canvas))

    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)

    Mousetrap.bind('ctrl+q', e => {
      e.preventDefault()
      this.setState({ devPanelOpened: !this.state.devPanelOpened })
    })
  }

  componentWillUnmount() {
    this.unregisterCanvas()
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  render() {
    const { devPanelOpened } = this.state

    return (
      <div className="App relative">
        <canvas
          id="canvas"
          className="App-canvas no-select"
        />
        <AppMenu />
        <FireInfo />
        <TileInfo />
        <TurnInfo />
        <UnitMenu />
        {devPanelOpened && <DevPanel />}
      </div>
    )
  }
}

export default App
