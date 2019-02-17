import React, { Component } from 'react'
import registerCanvas from '../lib/world/registerCanvas'
import './App.css';

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

  handleNewGameClick = () => {
    localStorage.removeItem('state')
    window.location.reload()
  }

  render() {
    return (
      <div className="App">
        <canvas
          id="canvas"
          className="App-canvas no-select"
        />
        <div className="relative">
          <button style={{ position: 'absolute', bottom: 30, right: 30 }} onClick={this.handleNewGameClick}>
            New Game
          </button>
        </div>
      </div>
    )
  }
}

export default App
