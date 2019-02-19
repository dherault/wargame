import React, { Component } from 'react'
import { connect } from 'react-redux'

import './FireInfo.css'

import computeRangeTiles from '../lib/units/computeRangeTiles'
import computeFireDamage from '../lib/units/computeFireDamage'

class FireInfo extends Component {

  render() {
    const { mouse, selectedUnit, turn, units, unitMenu, viewBox } = this.props

    if (!unitMenu.awaitFireSelection) return null

    const rangeTiles = computeRangeTiles(selectedUnit, unitMenu.firePosition)
    const unit = units.find(unit => 
      unit.team !== turn.team 
      && unit.position.x === mouse.x 
      && unit.position.y === mouse.y
      && rangeTiles.some(tile => unit.position.x === tile.x && unit.position.y === tile.y)
    )

    if (!unit) return null
    
    const tileSize = window.innerWidth / viewBox.width // pixel per tile
    const [attackedDamage, defenderDamage] = computeFireDamage(selectedUnit, unit)
    
    return (
      <div className="FireInfo absolute no-select pointer" style={{ top: (unit.position.y - viewBox.y) * tileSize, left: (unit.position.x - viewBox.x + 1) * tileSize }}>
        {attackedDamage} ⇄ {defenderDamage}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  mouse: s.mouse,
  selectedUnit: s.selectedUnit,
  turn: s.turn,
  unitMenu: s.unitMenu,
  units: s.units,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(FireInfo)
