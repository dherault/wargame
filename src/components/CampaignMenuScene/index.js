import React, { Component } from 'react'
import registerCanvas from '../../lib/campaignMenu/registerCanvas'

import './index.css'

class CampaignMenuScene extends Component {

  componentDidMount() {
    console.log('Mounting CampaignMenuScene')
    const canvas = document.getElementById('canvas-campaignMenu')
    
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
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  render() {
    return (
      <div className="CampaignMenuScene">
        <canvas
          id="canvas-campaignMenu"
          className="CampaignMenuScene-canvas no-select"
          tabIndex={0}
        />
      </div>
    )
  }
}

export default CampaignMenuScene
