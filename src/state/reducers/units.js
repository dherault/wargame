import computeFireDamage from '../../lib/units/computeFireDamage'

function units(state = [], action, globalState) {
  switch (action.type) {
    case 'SET_UNITS':
      return action.payload

    case 'MOVE_UNIT': {
      const units = state.slice()
      const { unit, tile } = action.payload
      const unitIndex = units.findIndex(u => u.id === unit.id)
      units[unitIndex] = Object.assign({}, units[unitIndex], { position: tile, played: true })

      return units
    }

    case 'FIRE': {
      const { attacker, defender } = action.payload
      const [attackerDamage, defenderDamage] = computeFireDamage(attacker, defender, globalState)
      const units = state.slice()
      const attackerUnitIndex = units.findIndex(u => u.id === attacker.id)
      const defenderUnitIndex = units.findIndex(u => u.id === defender.id)
      const nextAttacker = Object.assign({}, units[attackerUnitIndex], { life: attacker.life - defenderDamage })
      const nextDefender = Object.assign({}, units[defenderUnitIndex], { life: defender.life - attackerDamage })

      if (nextAttacker.life > 0) {
        units[attackerUnitIndex] = Object.assign({}, units[attackerUnitIndex], { life: attacker.life - defenderDamage })
      }
      else {
        units.splice(attackerUnitIndex, 1)
      }

      if (nextDefender.life > 0) {
        units[defenderUnitIndex] = Object.assign({}, units[defenderUnitIndex], { life: defender.life - attackerDamage })
      }
      else {
        units.splice(defenderUnitIndex, 1)
      }
      // NOTE: you cannot splice both indexes since both units cannot die in a confrontation

      return units
    }

    case 'END_PLAYER_TURN':   
      return state.map(unit => Object.assign({}, unit, { played: false }))

    default:
      return state
  }
}

export default units
