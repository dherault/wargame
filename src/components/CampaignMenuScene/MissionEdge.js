import React, { Component } from 'react'
import { euclidianDistance } from '../../lib/common/utils'
import gameConfiguration from '../../lib/gameConfiguration'

import './MissionEdge.css'

class MissionEdge extends Component {

  componentDidMount() {
    this.update = () => this.forceUpdate()
    window.addEventListener('resize', this.update)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update)
  }

  render() {
    const { positions: [p1, p2] } = this.props
    const { width, height } = gameConfiguration.imageDimensions.campaignMenuBackground

    const imageWidth = window.innerWidth
    const imageHeight = height * imageWidth / width

    const pp1 = {
      x: imageWidth * p1.x,
      y: imageHeight * p1.y,
    }
    const pp2 = {
      x: imageWidth * p2.x,
      y: imageHeight * p2.y,
    }

    const distance = euclidianDistance(pp1, pp2)
    const leftMost = pp1.x < pp2.x ? pp1 : pp2
    const theta1 = Math.atan2(pp2.y - pp1.y, pp2.x - pp1.x)
    const theta2 = leftMost === pp2 ? Math.PI : 0

    return (
      <div
        className="MissionEdge"
        style={{
          top: leftMost.y,
          left: leftMost.x,
        }}
      >
        <div
          className="MissionEdge-dashes"
          style={{
            width: distance,
            transform: `translate(0, -3px) rotate(${theta1 + theta2}rad)`,
            transformOrigin: 'top left',
          }}
        />
      </div>
    )
  }
}

export default MissionEdge
