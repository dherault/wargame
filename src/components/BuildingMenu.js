import React, { Component } from 'react'
import { connect } from 'react-redux'

import './BuildingMenu.css'

import { samePosition } from '../lib/utils'
import gameConfiguration from '../lib/gameConfiguration'

const buildingTypeToMovementTypes = {
  BASE: ['FOOT', 'WHEEL'],
  PORT: ['SAIL'],
  AIRPORT: ['FLY'],
}

class BuildingMenu extends Component {

  handleCreateUnitClick = type => {
    const { currentFaction, selectedPosition, dispatch } = this.props

    dispatch({
      type: 'CREATE_UNIT',
      payload: {
        type,
        position: selectedPosition,
        factionId: currentFaction.id,
        team: currentFaction.team,
      },
    })

    dispatch({
      type: 'CLOSE_BUILDING_MENU',
    })

  }

  render() {
    const { buildings, selectedPosition, buildingMenu, viewBox } = this.props

    if (!buildingMenu.opened) return null

    const tileSize = window.innerWidth / viewBox.width // pixel per tile
    const building = buildings.find(building => samePosition(building.position, selectedPosition))

    const movementTypes = buildingTypeToMovementTypes[building.type]

    if (!movementTypes) return null
    
    const availableUnits = Object.entries(gameConfiguration.unitsConfiguration)
      .filter(entry => movementTypes.includes(entry[1].movementType))
      .map(([type, unitConfiguration]) => ({
        type,
        cost: unitConfiguration.cost,
        name: unitConfiguration.name,
      }))

    return (
      <div 
        className="BuildingMenu absolute no-select pointer" 
        style={{ 
          top: (selectedPosition.y - viewBox.y) * tileSize, 
          left: (selectedPosition.x - viewBox.x + 1) * tileSize,
        }}
      >
        {availableUnits.map(data => (
          <div 
            key={data.type} 
            className="BuildingMenu-item"
            onClick={() => this.handleCreateUnitClick(data.type)}
          >
            {data.name} - {data.cost}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  buildingMenu: s.buildingMenu,
  buildings: s.buildings,
  currentFaction: s.currentFaction,
  selectedPosition: s.selectedPosition,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(BuildingMenu)
