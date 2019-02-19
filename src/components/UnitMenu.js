import React, { Component } from 'react'
import { connect } from 'react-redux'

import './UnitMenu.css'

import computeRangeTiles from '../lib/units/computeRangeTiles'
import gameConfiguration from '../lib/gameConfiguration';

class UnitMenu extends Component {

  closeMenu = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'CLOSE_UNIT_MENU',
    })
  }

  handleFireClick = () => {
    const { dispatch, selectedTile } = this.props

    dispatch({
      type: 'AWAIT_FIRE_SELECTION',
      payload: {
        firePosition: selectedTile,
      },
    })

    dispatch({
      type: 'DESELECT_TILE',
    })

    this.closeMenu()
  }

  handleAwaitClick = () => {
    const { selectedTile, selectedUnit, dispatch } = this.props
    
    dispatch({
      type: 'MOVE_UNIT',
      payload: {
        unit: selectedUnit,
        tile: selectedTile,
      },
    })

    this.handleCancelClick()
  }

  handleCancelClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'DESELECT_UNIT',
    })

    dispatch({
      type: 'DESELECT_TILE',
    })

    this.closeMenu()
  }

  render() {
    const { selectedTile, selectedUnit, units, unitMenu } = this.props

    if (!unitMenu.opened) return null

    const rangeTiles = computeRangeTiles(selectedUnit, selectedTile) // at end position

    return (
      <div className="UnitMenu absolute no-select pointer" style={{ top: unitMenu.offsetY, left: unitMenu.offsetX }}>
        {units.some(unit => 
          unit.team !== selectedUnit.team 
          && rangeTiles.some(tile => tile.x === unit.position.x && tile.y === unit.position.y)
          && gameConfiguration.unitsConfiguration[selectedUnit.type].damages[unit.type]
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
  selectedTile: s.selectedTile,
  selectedUnit: s.selectedUnit,
  unitMenu: s.unitMenu,
})

export default connect(mapStateToProps)(UnitMenu)
