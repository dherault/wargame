/*
  {
    id
    team
    type HUMAN/COMPUTER
    alive
  }
  An array of playing factions
*/
function factions(state = [], action, globalState) {
  switch (action.type) {
    case 'SET_FACTIONS':
      return action.payload

    // At each player's turn end,
    // Compute weither the factions are still alive or not
    case 'END_PLAYER_TURN': {
      const { units, buildings } = globalState

      return state.map(faction => Object.assign({}, faction, {
        alive: units.some(unit => unit.factionId === faction.id) && buildings.some(building => building.factionId === faction.id && building.type === 'HEADQUARTERS'),
      }))
    }

    default:
      return state
  }
}

export default factions
