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

import './GameWorld.css'

class GameWorld extends Component {

  componentDidMount() {
    console.log('Mounting GameWorld', window.innerWidth, window.innerHeight)
    const { dispatch } = this.props
    const canvas = document.getElementById('canvas-game')

    this.resizeCanvasListener = () => this.resizeCanvas(canvas)

    window.addEventListener('resize', this.resizeCanvasListener)

    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)

    dispatch({ 
      type: 'RESET_VIEW_BOX',
    })

    hotkeys(document.documentElement, 'ctrl+q', e => {
      const { isDevPanelOpened } = this.props

      e.preventDefault()
      
      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isDevPanelOpened: !isDevPanelOpened,
        },
      })
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
    const { gameOver, isDevPanelOpened } = this.props

    // tabIndex 0: https://stackoverflow.com/a/12887221/4847258
    return (
      <div className="GameWorld relative">
        <canvas
          id="canvas-game"
          className="GameWorld-canvas no-select"
          tabIndex={0}
        />
        <BuildingMenu />
        <FireInfo />
        <TileInfo />
        <TurnInfo />
        <UnitMenu />
        {isDevPanelOpened && <DevPanel />}
        {gameOver && <GameOverMenu />}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  gameOver: s.gameOver,
  isDevPanelOpened: s.booleans.isDevPanelOpened,
})

export default connect(mapStateToProps)(GameWorld)
