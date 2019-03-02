import React, { Component } from 'react'
import { connect } from 'react-redux'

import './UnitMenu.css'

import store from '../state/store'
import { samePosition, findById } from '../lib/common/utils'
import computeRangePositions from '../lib/game/computeRangePositions'
import gameConfiguration from '../lib/gameConfiguration'

class UnitMenu extends Component {

  closeMenu = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isUnitMenuOpened: false,
      },
    })
  }

  moveUnit = () => {
    const { dispatch, selectedUnitId, selectedPosition } = this.props

    dispatch({
      type: 'MOVE_UNIT',
      payload: {
        unitId: selectedUnitId,
        position: selectedPosition,
      },
    })
  }

  playUnit = () => {
    const { selectedUnitId, dispatch } = this.props
    
    dispatch({
      type: 'PLAY_UNIT',
      payload: {
        unitId: selectedUnitId,
      },
    })
  }

  handleFireClick = () => {
    const { dispatch } = this.props

    this.moveUnit()

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isFireSelection: true,
      },
    })

    dispatch({
      type: 'DESELECT_POSITION',
    })

    this.closeMenu()
  }

  handleCaptureClick = () => {
    const { buildings, selectedPosition, selectedUnitId, dispatch } = this.props
    
    this.moveUnit()

    dispatch({
      type: 'CAPTURE',
      payload: {
        buildingId: buildings.find(building => samePosition(building.position, selectedPosition)).id,
        unitId: selectedUnitId,
      },
    })

    this.playUnit()
    this.handleCancelClick()
  }

  handleAwaitClick = () => {
    this.moveUnit()
    this.playUnit()
    this.handleCancelClick()
  }

  handleCancelClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'DESELECT_UNIT_ID',
    })

    dispatch({
      type: 'DESELECT_POSITION',
    })

    this.closeMenu()
  }

  render() {
    const { booleans, buildings, units, selectedPosition, selectedUnitId, viewBox } = this.props

    if (!booleans.isUnitMenuOpened) return null

    const tileSize = window.innerWidth / viewBox.width // pixel per tile
    const selectedUnit = findById(units, selectedUnitId)
    const rangePositions = computeRangePositions(store, selectedUnit, selectedPosition) // range positions at selected position
    
    return (
      <div 
        className="UnitMenu absolute no-select pointer" 
        style={{ 
          left: (selectedPosition.x - viewBox.x + 1) * tileSize + viewBox.offsetX,
          top: (selectedPosition.y - viewBox.y) * tileSize + viewBox.offsetY, 
        }}
      >
        {units.some(unit => // If there is a unit
          unit.team !== selectedUnit.team // From opposite team
          && rangePositions.some(position => samePosition(position, unit.position)) // In range
          && gameConfiguration.unitsConfiguration[selectedUnit.type].damages[unit.type] // Able to take damages from selectedUnit
        ) && (
          <div className="UnitMenu-item" onClick={this.handleFireClick}>
            Fire
          </div>
        )}
        {buildings.some(building => // If there is a building
          building.team !== selectedUnit.team // From opposite or no team
          && samePosition(selectedPosition, building.position) // at selected position
          && selectedUnit.type === 'INFANTERY' // and the selected unit can capture it
        ) && (
          <div className="UnitMenu-item" onClick={this.handleCaptureClick}>
            Capture
          </div>
        )}  
        <div className="UnitMenu-item" onClick={this.handleAwaitClick}>
          Await
        </div>
        <div className="UnitMenu-item" onClick={this.handleCancelClick}>
          Cancel
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  booleans: s.booleans,
  buildings: s.buildings,
  selectedPosition: s.selectedPosition,
  selectedUnitId: s.selectedUnitId,
  units: s.units,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(UnitMenu)
