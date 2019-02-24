/*
  id
  team
  type // HUMAN/COMPUTER
*/
function factions(state = [], action, globalState) {
  switch (action.type) {
    case 'SET_FACTIONS':
      return action.payload

    case 'END_PLAYER_TURN': {
      const { units, buildings } = globalState

      return state.map(faction => Object.assign({}, faction, {
        alive: units.some(unit => unit.factionId === faction.id) && buildings.some(building => building.factionId === faction.id && building.type === 'HEADQUARTERS')
      }))
    }

    default:
      return state
  }
}

export default factions
