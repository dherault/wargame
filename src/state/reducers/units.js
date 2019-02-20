/*
  An array of units
*/
function units(state = [], action, globalState) {
  switch (action.type) {
    case 'SET_UNITS':
      return action.payload

    case 'PLAY_UNIT': {
      const units = state.slice()
      const { unitId } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)
      units[unitIndex] = Object.assign({}, units[unitIndex], { played: true })

      return units
    }

    case 'MOVE_UNIT': {
      const units = state.slice()
      const { unitId, position } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)
      units[unitIndex] = Object.assign({}, units[unitIndex], { position, previousPosition: units[unitIndex].position })

      return units
    }

    case 'FIRE': {
      const { attackerId, defenderId, damages } = action.payload
      const [attackerDamage, defenderDamage] = damages
      const units = state.slice()
      const attackerUnitIndex = units.findIndex(u => u.id === attackerId)
      const defenderUnitIndex = units.findIndex(u => u.id === defenderId)
      const nextAttacker = Object.assign({}, units[attackerUnitIndex], { life: units[attackerUnitIndex].life - defenderDamage })
      const nextDefender = Object.assign({}, units[defenderUnitIndex], { life: units[defenderUnitIndex].life - attackerDamage })

      if (nextAttacker.life > 0) {
        units[attackerUnitIndex] = nextAttacker
      }
      else {
        units.splice(attackerUnitIndex, 1)
      }

      if (nextDefender.life > 0) {
        units[defenderUnitIndex] = nextDefender
      }
      else {
        units.splice(defenderUnitIndex, 1)
      }
      // NOTE: you cannot splice both indexes (would lead to index shifting) since both units cannot die in a confrontation

      return units
    }

    case 'END_PLAYER_TURN':   
      return state.map(unit => Object.assign({}, unit, { played: false }))

    default:
      return state
  }
}

export default units
