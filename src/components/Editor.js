import React, { Component } from 'react'
import { connect } from 'react-redux'
import createNewEditor from '../lib/editor/createNewEditor'
import registerCanvas from '../lib/editor/registerCanvas'

import './Editor.css'

import EditorPanel from './EditorPanel'

class Editor extends Component {

  componentDidMount() {
    console.log('Mounting Editor')
    const { isEditing } = this.props

    if (!isEditing) createNewEditor()

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
          tabIndex={0}
        />
        <EditorPanel />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  isEditing: s.booleans.isEditing,
})

export default connect(mapStateToProps)(Editor)
