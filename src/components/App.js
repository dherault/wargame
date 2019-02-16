import React, { Component } from 'react'
import registerCanvas from '../lib/world/registerCanvas'
import './App.css';

class App extends Component {

  canvasRef = React.createRef()

  componentDidMount() {
    console.log('Mounting App', window.innerWidth, window.innerHeight)
    this.canvasRef.current.width = window.innerWidth - 4
    this.canvasRef.current.height = window.innerHeight - 4
    this.unregisterCanvas = registerCanvas(this.canvasRef.current)
  }

  componentWillUnmount() {
    this.unregisterCanvas()
  }

  render() {
    return (
      <div className="App">
        <canvas
          ref={this.canvasRef}
          className="App-canvas no-select"
        />
      </div>
    )
  }
}

export default App
