import gameConfiguration from '../../lib/gameConfiguration'

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
      const { turn, buildings } = globalState
      const nCities = buildings.filter(building => building.type === 'CITY' && building.factionId === turn.faction.id).length

      return {
        ...state,
        [turn.faction.id]: state[turn.faction.id] + nCities * gameConfiguration.moneyPerCityPerTurn,
      }
    }

    default:
      return state
  }
}

export default moneyByFaction