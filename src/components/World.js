import React, { Component } from 'react'
import { connect } from 'react-redux'
import hotkeys from 'piano-keys'
import registerCanvas from '../lib/game/registerCanvas'

import BuildingMenu from './BuildingMenu'
import DevPanel from './DevPanel'
import FireInfo from './FireInfo'
import GameOverMenu from './GameOverMenu'
import TileInfo from './TileInfo'
import TurnInfo from './TurnInfo'
import UnitMenu from './UnitMenu'

import './World.css'

class World extends Component {

  state = {
    devPanelOpened: process.env.NODE_ENV === 'development',
  }

  componentDidMount() {
    console.log('Mounting World', window.innerWidth, window.innerHeight)

    const canvas = document.getElementById('canvas-game')

    this.resizeCanvasListener = () => this.resizeCanvas(canvas)

    window.addEventListener('resize', this.resizeCanvasListener)

    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)

    hotkeys(document.documentElement, 'ctrl+q', e => {
      e.preventDefault()
      this.setState(state => ({ devPanelOpened: !state.devPanelOpened }))
    })
  }

  componentWillUnmount() {
    this.unregisterCanvas()
    window.removeEventListener('resize', this.resizeCanvasListener)
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  render() {
    const { gameOver } = this.props
    const { devPanelOpened } = this.state

    return (
      <div className="World relative">
        <canvas
          id="canvas-game"
          className="World-canvas no-select"
        />
        <BuildingMenu />
        <FireInfo />
        <TileInfo />
        <TurnInfo />
        <UnitMenu />
        {devPanelOpened && <DevPanel />}
        {gameOver && <GameOverMenu />}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  gameOver: s.gameOver,
})

export default connect(mapStateToProps)(World)
