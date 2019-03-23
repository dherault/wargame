import React, { Component } from 'react'
import { connect } from 'react-redux'

import gameConfiguration from '../../lib/gameConfiguration'

import './Mission.css'

const missionSize = 32 * 1.5

class Mission extends Component {

  render() {
    const { mission } = this.props

    return (
      <div 
        className="Mission x5" 
        style={{ 
          width: missionSize,
          height: missionSize,
          top: `calc(${mission.position.y * 100}% - ${missionSize / 2}px)`,
          left: `calc(${mission.position.x * 100}% - ${missionSize / 2}px)`,
        }}
      >
        <img 
          src={gameConfiguration.imageSources.campaignMenuSwords} 
          className="Mission-swords" 
        />
      </div>
    )
  }
}

export default connect()(Mission)
