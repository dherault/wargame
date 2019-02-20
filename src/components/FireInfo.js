import React, { Component } from 'react'
import { connect } from 'react-redux'

import './FireInfo.css'

import { samePosition, findById } from '../lib/utils'
import computeRangePositions from '../lib/units/computeRangePositions'
import computeFireDamage from '../lib/units/computeFireDamage'

class FireInfo extends Component {

  render() {
    const { mouse, selectedUnitId, turn, units, unitMenu, viewBox } = this.props

    if (!unitMenu.awaitFireSelection) return null

    const selectedUnit = findById(units, selectedUnitId)
    const rangePositions = computeRangePositions(selectedUnit)
    const unit = units.find(unit => 
      unit.team !== turn.team // From opposite team
      && samePosition(unit.position, mouse) // At mouse position 
      && rangePositions.some(position => samePosition(unit.position, position)) // In range
    )

    if (!unit) return null
    
    const tileSize = window.innerWidth / viewBox.width // pixel per tile
    const [attackedDamage, defenderDamage] = computeFireDamage(selectedUnitId, unit.id)
    
    return (
      <div 
        className="FireInfo absolute no-select pointer" 
        style={{ 
          top: (unit.position.y - viewBox.y) * tileSize, 
          left: (unit.position.x - viewBox.x + 1) * tileSize 
        }}
      >
        {attackedDamage} ⇄ {defenderDamage}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  mouse: s.mouse,
  selectedUnitId: s.selectedUnitId,
  turn: s.turn,
  unitMenu: s.unitMenu,
  units: s.units,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(FireInfo)
