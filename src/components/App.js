import React, { Component } from 'react'
import { connect } from 'react-redux'
import registerCanvas from '../lib/registerCanvas'
import gameConfiguration from '../lib/gameConfiguration'

import FireInfo from './FireInfo'
import UnitMenu from './UnitMenu'

import './App.css'

class App extends Component {

  componentDidMount() {
    console.log('Mounting App', window.innerWidth, window.innerHeight)

    const canvas = document.getElementById('canvas')

    window.addEventListener('resize', () => this.resizeCanvas(canvas))

    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)
  }

  componentWillUnmount() {
    this.unregisterCanvas()
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  handleNextPlayerClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'END_PLAYER_TURN',
    })
  }

  handleNewGameClick = () => {
    localStorage.removeItem('state')
    window.location.reload()
  }

  render() {
    const { turn } = this.props

    return (
      <div className="App relative">
        <canvas
          id="canvas"
          className="App-canvas no-select"
        />
        <UnitMenu />
        <FireInfo />
        <div className="absolute x4" style={{ bottom: 30, right: 30, background: 'white', padding: 10 }}>
          <div style={{ marginRight: 10 }}>
            turn {turn.number} - {gameConfiguration.factionsConfiguration[turn.faction].name}
          </div>
          <button style={{ marginRight: 10 }} onClick={this.handleNextPlayerClick}>
            End Turn
          </button>
          <button onClick={this.handleNewGameClick}>
            New Game
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  turn: s.turn,
})

export default connect(mapStateToProps)(App)
