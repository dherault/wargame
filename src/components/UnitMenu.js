import React, { Component } from 'react'
import { connect } from 'react-redux'

import './UnitMenu.css'

import { samePosition, findById } from '../lib/utils'
import computeRangePositions from '../lib/units/computeRangePositions'
import gameConfiguration from '../lib/gameConfiguration'

class UnitMenu extends Component {

  closeMenu = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'CLOSE_UNIT_MENU',
    })
  }

  handleFireClick = () => {
    const { dispatch, selectedUnitId, selectedPosition } = this.props

    dispatch({
      type: 'MOVE_UNIT',
      payload: {
        unitId: selectedUnitId,
        position: selectedPosition,
      },
    })

    dispatch({
      type: 'AWAIT_FIRE_SELECTION',
    })

    dispatch({
      type: 'DESELECT_POSITION',
    })

    this.closeMenu()
  }

  handleAwaitClick = () => {
    const { selectedPosition, selectedUnitId, dispatch } = this.props
    
    dispatch({
      type: 'MOVE_UNIT',
      payload: {
        unitId: selectedUnitId,
        position: selectedPosition,
      },
    })

    dispatch({
      type: 'PLAY_UNIT',
      payload: {
        unitId: selectedUnitId,
      },
    })

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
    const { selectedPosition, selectedUnitId, units, unitMenu } = this.props

    if (!unitMenu.opened) return null

    const selectedUnit = findById(units, selectedUnitId)
    console.log('selectedUnit', selectedUnit)
    const rangePositions = computeRangePositions(selectedUnit, selectedPosition) // range positions at selected position
    
    return (
      <div className="UnitMenu absolute no-select pointer" style={{ top: unitMenu.offsetY, left: unitMenu.offsetX }}>
        {units.some(unit => // If there is a unit
          unit.team !== selectedUnit.team // From opposite team
          && rangePositions.some(position => samePosition(position, unit.position)) // In range
          && gameConfiguration.unitsConfiguration[selectedUnit.type].damages[unit.type] // Able to take damages from selectedUnit
        ) && (
          <div className="UnitMenu-item" onClick={this.handleFireClick}>
            Fire
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
  units: s.units,
  selectedPosition: s.selectedPosition,
  selectedUnitId: s.selectedUnitId,
  unitMenu: s.unitMenu,
})

export default connect(mapStateToProps)(UnitMenu)
