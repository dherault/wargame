import React, { Component } from 'react'
import { connect } from 'react-redux'
import './UnitMenu.css'

class UnitMenu extends Component {

  closeMenu = () => {
    this.props.dispatch({
      type: 'CLOSE_UNIT_MENU',
    })
  }

  handleMovelClick = () => {
    const { selectedTile, selectedUnits, dispatch } = this.props
    
    dispatch({
      type: 'MOVE_UNIT',
      payload: {
        unit: selectedUnits[0],
        tile: selectedTile,
      },
    })

    this.handleCancelClick()
  }

  handleCancelClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'DESELECT_UNITS',
    })

    dispatch({
      type: 'DESELECT_TILE',
    })

    this.closeMenu()
  }

  render() {
    const { selectedUnits, unitMenu } = this.props

    if (!unitMenu.opened) return null

    return (
      <div className="UnitMenu absolute no-select pointer" style={{ top: unitMenu.offsetY, left: unitMenu.offsetX }}>
        <div className="UnitMenu-item" onClick={this.handleMovelClick}>
          Move here
        </div>
        <div className="UnitMenu-item" onClick={this.handleCancelClick}>
          Cancel
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  selectedTile: s.selectedTile,
  selectedUnits: s.selectedUnits,
  unitMenu: s.unitMenu,
})

export default connect(mapStateToProps)(UnitMenu)
