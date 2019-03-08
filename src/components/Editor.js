import React, { Component } from 'react'
import { connect } from 'react-redux'
import createNewEditor from '../lib/editor/createNewEditor'
import registerCanvas from '../lib/editor/registerCanvas'

import './Editor.css'

import EditorPanel from './EditorPanel'
import TileInfo from './TileInfo'

class Editor extends Component {

  componentDidMount() {
    console.log('Mounting Editor')
    const { isEditing } = this.props
    const canvas = document.getElementById('canvas-editor')
    
    this.resizeCanvasListener = () => this.resizeCanvas(canvas)
    
    window.addEventListener('resize', this.resizeCanvasListener)
    
    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)

    if (!isEditing) createNewEditor()
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
    const { isEditing } = this.props

    return (
      <div className="Editor">
        <canvas
          id="canvas-editor"
          className="Editor-canvas no-select"
          tabIndex={0}
        />
        {isEditing && <EditorPanel />}
        <TileInfo />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  isEditing: s.booleans.isEditing,
})

export default connect(mapStateToProps)(Editor)
