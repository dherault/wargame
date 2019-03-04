import React, { Component } from 'react'
import createNewEditor from '../lib/editor/createNewEditor'
import registerCanvas from '../lib/editor/registerCanvas'

import './Editor.css'

import EditorPanel from './EditorPanel'

class Editor extends Component {

  componentDidMount() {
    console.log('Mounting Editor')

    createNewEditor()

    const canvas = document.getElementById('canvas-editor')

    this.resizeCanvasListener = () => this.resizeCanvas(canvas)

    window.addEventListener('resize', this.resizeCanvasListener)

    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)
  }

  componentWillUnmount() {
    this.unregisterCanvas()
    window.removeEventListener('resize', this.resizeCanvasListener)
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth - 250
    canvas.height = window.innerHeight
  }

  render() {

    return (
      <div className="Editor">
        <canvas
          id="canvas-editor"
          className="Editor-canvas no-select"
        />
        <EditorPanel />
      </div>
    )
  }
}

export default Editor
