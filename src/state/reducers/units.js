import { createId, samePosition } from '../../lib/common/utils'
import DataError from '../../lib/common/DataError'

/*
  An array of units
*/
function units(state = [], action, globalState, ongoingState) {
  switch (action.type) {
    case 'SET_UNITS':
      return action.payload

    case 'CREATE_UNIT': {
      const { type, position, factionId, team } = action.payload

      // If a unit is on the same position, throw
      if (state.some(u => samePosition(u.position, position))) throw new DataError('Unit - CREATE_UNIT - a unit is already on the position', { position })
      // We do not check if the unit is on a forbidden position since it can only be created in a building

      const unit = { type, position, factionId, team, life: 100, played: true, id: createId() }

      return [...state, unit]
    }

    case 'PLAY_UNIT': {
      const units = state.slice()
      const { unitId } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)

      if (unitIndex === -1) throw new DataError('Units - PLAY_UNIT - unit not found', { unitId })

      units[unitIndex] = Object.assign({}, units[unitIndex], { played: true })

      return units
    }

    case 'MOVE_UNIT': {
      const units = state.slice()
      const { unitId, position } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)

      if (unitIndex === -1) throw new DataError('Units - MOVE_UNIT - unit not found', { unitId, position })
      if (units.some(u => u.id !== unitId && samePosition(u.position, position))) throw new DataError('Unit - MOVE_UNIT - a unit is already on the position', { unitId, position })

      units[unitIndex] = Object.assign({}, units[unitIndex], { position, previousPosition: units[unitIndex].position })

      return units
    }

    case 'FIRE': {
      const { attackerId, defenderId, damages } = action.payload
      const [attackerDamage, defenderDamage] = damages
      const units = state.slice()
      const attackerUnitIndex = units.findIndex(u => u.id === attackerId)
      const defenderUnitIndex = units.findIndex(u => u.id === defenderId)

      if (attackerUnitIndex === -1) throw new DataError('Units - FIRE - Attacker not found', { attackerId })
      if (defenderUnitIndex === -1) throw new DataError('Units - FIRE - Defender not found', { defenderId })

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

    case 'CAPTURE': {
      const { buildings } = ongoingState
      
      const remainingFactionIds = buildings
        .filter(building => building.type === 'HEADQUARTERS')
        .map(building => building.factionId)

      return state.filter(unit => remainingFactionIds.includes(unit.factionId))
    }

    case 'BEGIN_PLAYER_TURN': {
      const { currentFaction, buildings } = ongoingState
      
      return state.map(unit => {

        const building = buildings.find(building => building.factionId === currentFaction.id && samePosition(building.position, unit.position))
        
        if (building) {
          return Object.assign({}, unit, { life: Math.min(100, unit.life + 20) })
        }

        return unit
      })
    }

    case 'END_PLAYER_TURN':   
      return state.map(unit => Object.assign({}, unit, { played: false }))

    default:
      return state
  }
}

export default units
