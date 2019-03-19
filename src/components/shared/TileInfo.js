import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TileInfo.css'

import gameConfiguration from '../../lib/gameConfiguration'
import { samePosition } from '../../lib/common/utils'

class TileInfo extends Component {

  render() {
    const { mouse, worldMap, units, buildings } = this.props
    
    if (!worldMap) return null

    const tile = worldMap[mouse.y] && worldMap[mouse.y][mouse.x]

    if (!tile) return null

    const tileConfiguration = gameConfiguration.terrainConfiguration[tile]
    const unit = units.find(unit => samePosition(unit.position, mouse))
    const building = buildings.find(building => samePosition(building.position, mouse))

    return ( 
      <div className="TileInfo absolute x4">
        {tileConfiguration.name} (defense {tileConfiguration.defense}) 
        {building && ` - capture ${building.capture}`} 
        {unit && ` - ${gameConfiguration.unitsConfiguration[unit.type].name}`}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  mouse: s.mouse,
  buildings: s.buildings,
  units: s.units,
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(TileInfo)
