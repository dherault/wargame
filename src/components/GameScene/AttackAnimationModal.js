import React, { PureComponent } from 'react'
import gameConfiguration from '../../lib/gameConfiguration'
import registerCanvas from '../../lib/game/attackAnimation/registerCanvas'

import './AttackAnimationModal.css'

class AttackAnimationModal extends PureComponent {

  componentDidMount() {
    const canvas = document.getElementById('canvas-AttackAnimationModal')

    /* Resize canvas */

    this.resizeCanvasListener = () => this.resizeCanvas(canvas)

    window.addEventListener('resize', this.resizeCanvasListener)

    this.resizeCanvas(canvas)

    /* Register canvas and draw */

    this.unregisterCanvas = registerCanvas(canvas)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvasListener)
    this.unregisterCanvas()
  }

  resizeCanvas(canvas) {
    const { width: tileWidth, height: tileHeight } = gameConfiguration.imageTileDimensions.attackAnimationBackgrounds
    const width = window.innerWidth / 2
    const relativeTileWidth = (width - gameConfiguration.attackAnimationSeparatorWidth) / 2
    const relativeTileHeight = tileHeight * relativeTileWidth / tileWidth

    canvas.width = width
    canvas.height = relativeTileHeight
  }

  render() {
    return (
      <div className="AttackAnimationModal x5">
        <div className="AttackAnimationModal-inner">
          <canvas
            id="canvas-AttackAnimationModal"
            className="AttackAnimationModal-canvas no-select"
            tabIndex={0}
          />
        </div>
      </div>
    )
  }
}

export default AttackAnimationModal
