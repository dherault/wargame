import React from 'react'
import { connect } from 'react-redux'

import './FireInfo.css'

import store from '../../state/store'
import { samePosition, findById } from '../../lib/common/utils'
import computeRangePositions from '../../lib/game/computeRangePositions'
import computeFireDamage from '../../lib/game/computeFireDamage'
import gameConfiguration from '../../lib/gameConfiguration'

const FireInfo = ({ booleans, mouse, selectedUnitId, currentFaction, units, viewBox }) => {
  if (!window.canvas) return null
  if (!booleans.isFireSelection) return null

  const selectedUnit = findById(units, selectedUnitId)
  const rangePositions = computeRangePositions(store, selectedUnit)
  const unit = units.find(unit =>
    unit.team !== currentFaction.team // From opposite team
    && samePosition(unit.position, mouse) // At mouse position
    && rangePositions.some(position => samePosition(unit.position, position)) // In range
    && gameConfiguration.unitsConfiguration[selectedUnit.type].damages[unit.type] // That can be damaged
  )

  if (!unit) return null

  const tileSize = window.canvas.width / viewBox.width // pixel per tile
  const [attackedDamage, defenderDamage] = computeFireDamage(store, selectedUnitId, unit.id)

  return (
    <div
      className="FireInfo absolute no-select pointer"
      style={{
        left: (unit.position.x - viewBox.x + 1) * tileSize + viewBox.offsetX,
        top: (unit.position.y - viewBox.y) * tileSize + viewBox.offsetY,
      }}
    >
      {attackedDamage} ⇄ {defenderDamage}
    </div>
  )
}

const mapStateToProps = s => ({
  booleans: s.booleans,
  currentFaction: s.currentFaction,
  mouse: s.mouse,
  selectedUnitId: s.selectedUnitId,
  units: s.units,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(FireInfo)
