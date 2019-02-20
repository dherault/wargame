import React, { Component } from 'react'
import registerCanvas from '../lib/registerCanvas'

import AppMenu from './AppMenu'
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

  render() {
    return (
      <div className="App relative">
        <canvas
          id="canvas"
          className="App-canvas no-select"
        />
        <AppMenu />
        <FireInfo />
        <UnitMenu />
      </div>
    )
  }
}

export default App
