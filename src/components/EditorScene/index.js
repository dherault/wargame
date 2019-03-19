import React, { Component } from 'react'
import { connect } from 'react-redux'
import createNewEditor from '../../lib/editor/createNewEditor'
import registerCanvas from '../../lib/editor/registerCanvas'

import './index.css'

import EditorPanel from './EditorPanel'
import TileInfo from '../shared/TileInfo'

class EditorScene extends Component {

  componentDidMount() {
    console.log('Mounting EditorScene')
    const { isEditing, dispatch } = this.props
    const canvas = document.getElementById('canvas-editor')
    
    this.resizeCanvasListener = () => this.resizeCanvas(canvas)
    
    window.addEventListener('resize', this.resizeCanvasListener)
    
    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)

    if (!isEditing) createNewEditor()
    
    dispatch({ 
      type: 'RESET_VIEW_BOX',
    })
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
      <div className="EditorScene">
        <canvas
          id="canvas-editor"
          className="EditorScene-canvas no-select"
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

export default connect(mapStateToProps)(EditorScene)
