import gameConfiguration from '../../lib/gameConfiguration'
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

      const unit = {
        id: createId(),
        type,
        position,
        factionId,
        team,
        life: 100,
        played: true,
      }

      return [...state, unit]
    }

    case 'PLAY_UNIT': {
      const units = state.slice()
      const { unitId } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)

      if (unitIndex === -1) throw new DataError('Units - PLAY_UNIT - unit not found', { unitId })

      units[unitIndex] = {
        ...units[unitIndex],
        played: true,
      }

      return units
    }

    case 'MOVE_UNIT': {
      const units = state.slice()
      const { unitId, position } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)

      const unit = units[unitIndex]
      const unitOnPosition = units.find(u => u.id !== unitId && samePosition(u.position, position))

      if (unitIndex === -1) throw new DataError('Units - MOVE_UNIT - unit not found', { unitId, position })
      if (unitOnPosition && unitOnPosition.type !== unit.type && unit.life >= 100 && unitOnPosition.life >= 100) throw new DataError('Unit - MOVE_UNIT - a unit is already on the position', { unitId, position })

      units[unitIndex] = {
        ...unit,
        position,
        isMoving: true,
        currentPosition: units[unitIndex].position,
        previousPosition: units[unitIndex].position,
      }

      return units
    }

    case 'MOVE_UNIT_POSITION': {
      const units = state.slice()
      const { unitId, position } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)

      if (unitIndex === -1) throw new DataError('Units - MOVE_UNIT_POSITION - unit not found', { unitId, position })

      units[unitIndex] = {
        ...units[unitIndex],
        currentPosition: position,
      }

      return units
    }

    case 'MOVE_UNIT_DONE': {
      const units = state.slice()
      const { unitId } = action.payload
      const unitIndex = units.findIndex(u => u.id === unitId)

      if (unitIndex === -1) throw new DataError('Units - MOVE_UNIT_DONE - unit not found', { unitId })

      units[unitIndex] = {
        ...units[unitIndex],
        isMoving: false,
        currentPosition: null,
      }

      return units
    }

    case 'FIRE': {
      const { attackerId, defenderId, damages: [attackerDamage, defenderDamage] } = action.payload
      const units = state.slice()
      const attackerUnitIndex = units.findIndex(u => u.id === attackerId)
      const defenderUnitIndex = units.findIndex(u => u.id === defenderId)

      if (attackerUnitIndex === -1) throw new DataError('Units - FIRE - Attacker not found', { attackerId })
      if (defenderUnitIndex === -1) throw new DataError('Units - FIRE - Defender not found', { defenderId })

      units[attackerUnitIndex] = {
        ...units[attackerUnitIndex],
        life: units[attackerUnitIndex].life - defenderDamage,
      }
      units[defenderUnitIndex] = {
        ...units[defenderUnitIndex],
        life: units[defenderUnitIndex].life - attackerDamage,
      }

      // If life <= 0, unitSaga will trigger KILL_UNIT
      return units
    }

    case 'DELETE_UNIT':
    case 'KILL_UNIT': {
      const { unitId } = action.payload
      const units = state.slice()
      const unitIndex = units.findIndex(u => u.id === unitId)

      units.splice(unitIndex, 1)

      return units
    }

    case 'MERGE_UNITS': {
      const { unitId, mergedUnitId } = action.payload
      const units = state.slice()
      const unitIndex = units.findIndex(u => u.id === unitId)
      const mergedUnitIndex = units.findIndex(u => u.id === mergedUnitId)
      const unit = units[unitIndex]
      const [mergedUnit] = units.splice(mergedUnitIndex, 1)

      if (unit.type !== mergedUnit.type) throw new DataError('Units - MERGE_UNITS - Units are not of the same type', { unit, mergedUnit })

      units[unitIndex] = {
        ...unit,
        life: Math.min(100, unit.life + mergedUnit.life),
        played: true,
      }

      return units
    }

    case 'FLIP_UNIT': {
      const { unitId } = action.payload
      const units = state.slice()
      const unitIndex = units.findIndex(u => u.id === unitId)

      units[unitIndex].flipped = !units[unitIndex].flipped

      return units
    }

    case 'CAPTURE': {
      const { buildings } = ongoingState

      const remainingFactionIds = buildings
        .filter(building => building.type === 'HEADQUARTERS')
        .map(building => building.factionId)

      return state.filter(unit => remainingFactionIds.includes(unit.factionId))
    }

    // On every turn beginning we repair the units on cities
    case 'BEGIN_PLAYER_TURN': {
      const { currentFaction, buildings } = ongoingState

      return state.map(unit => {

        const building = buildings.find(building => building.factionId === currentFaction.id && samePosition(building.position, unit.position))

        // A building can only repair certain movement types
        if (building && building.factionId === unit.factionId) {
          const { reparableMovementTypes } = gameConfiguration.buildingsConfiguration[building.type]
          const { movementType } = gameConfiguration.unitsConfiguration[unit.type]

          if (reparableMovementTypes.includes(movementType)) {
            return {
              ...unit,
              life: Math.min(100, unit.life + 20),
            }
          }
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
