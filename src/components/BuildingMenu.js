import React, { Component } from 'react'
import { connect } from 'react-redux'

import './BuildingMenu.css'

import { samePosition } from '../lib/common/utils'
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
      type: 'SET_BOOLEAN',
      payload: {
        isBuildingMenuOpened: false,
      },
    })

    window.canvas.focus()
  }

  render() {
    if (!window.canvas) return null
    
    const { buildings, selectedPosition, booleans, viewBox } = this.props

    if (!booleans.isBuildingMenuOpened || !selectedPosition) return null

    const tileSize = window.canvas.width / viewBox.width // pixel per tile
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
          left: (selectedPosition.x - viewBox.x + 1) * tileSize + viewBox.offsetX,
          top: (selectedPosition.y - viewBox.y) * tileSize + viewBox.offsetY, 
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
  booleans: s.booleans,
  buildings: s.buildings,
  currentFaction: s.currentFaction,
  selectedPosition: s.selectedPosition,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(BuildingMenu)
