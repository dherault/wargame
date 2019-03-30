import gameConfiguration from '../../lib/gameConfiguration'
import { findById } from '../../lib/common/utils'

/*
  {
    [factionId]: money
  }
  The money each faction has
*/
function moneyByFaction(state = {}, action, globalState) {
  switch (action.type) {

    case 'SET_MONEY_BY_FACTION': {
      return action.payload
    }

    case 'BEGIN_PLAYER_TURN': {
      const { currentFaction, buildings } = globalState
      const nCities = buildings.filter(building => (building.type === 'CITY' || building.type === 'HEADQUARTERS') && building.factionId === currentFaction.id).length

      return {
        ...state,
        [currentFaction.id]: state[currentFaction.id] + nCities * gameConfiguration.moneyPerCityPerTurn,
      }
    }

    case 'CREATE_UNIT': {
      const { type, factionId } = action.payload

      return {
        ...state,
        [factionId]: state[factionId] - gameConfiguration.unitsConfiguration[type].cost,
      }
    }

    case 'MERGE_UNITS': {
      const { unitId, mergedUnitId } = action.payload
      const { units } = globalState
      const unit = findById(units, unitId)
      const mergedUnit = findById(units, mergedUnitId)

      const lifeOverflowRatio = (unit.life + mergedUnit.life - gameConfiguration.maxUnitLife) / gameConfiguration.maxUnitLife

      if (lifeOverflowRatio <= 0) return state

      return {
        ...state,
        [unit.factionId]: state[unit.factionId] + gameConfiguration.unitsConfiguration[unit.type].cost * lifeOverflowRatio,
      }
    }

    default:
      return state
  }
}

export default moneyByFaction
