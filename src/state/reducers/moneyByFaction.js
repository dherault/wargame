import gameConfiguration from '../../lib/gameConfiguration'

/*
  {
    [factionId]: money
  }
*/
function moneyByFaction(state = {}, action, globalState) {
  switch (action.type) {

    case 'SET_MONEY_BY_FACTION': 
      return action.payload

    case 'CREATE_UNIT': {
      const { type, factionId } = action.payload

      return {
        ...state,
        [factionId]: state[factionId] - gameConfiguration.unitsConfiguration[type].cost,
      }
    }

    case 'BEGIN_PLAYER_TURN': {
      const { currentFaction, buildings } = globalState
      const nCities = buildings.filter(building => (building.type === 'CITY' || building.type === 'HEADQUARTERS') && building.factionId === currentFaction.id).length

      return {
        ...state,
        [currentFaction.id]: state[currentFaction.id] + nCities * gameConfiguration.moneyPerCityPerTurn,
      }
    }

    default:
      return state
  }
}

export default moneyByFaction