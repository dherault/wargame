import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TileInfo.css'

import gameConfiguration from '../lib/gameConfiguration'
import { samePosition } from '../lib/utils'

class TileInfo extends Component {

  render() {
    const { mouse, worldMap, units } = this.props
    
    if (!worldMap) return null

    const tile = worldMap[mouse.y][mouse.x]

    if (!tile) return null

    const tileConfiguration = gameConfiguration.terrainConfiguration[tile.type]
    const unit = units.find(unit => samePosition(unit.position, mouse))

    return ( 
      <div className="TileInfo absolute x4">
        {tileConfiguration.name} (defense {tileConfiguration.defense}) {unit && `- ${gameConfiguration.unitsConfiguration[unit.type].name}`}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  mouse: s.mouse,
  units: s.units,
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(TileInfo)
