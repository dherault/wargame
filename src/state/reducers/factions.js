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
      const { units, buildings, turn } = globalState

      return state.map(faction => ({
        ...faction,
        alive: turn === 1 || (units.some(unit => unit.factionId === faction.id) && buildings.some(building => building.factionId === faction.id && building.type === 'HEADQUARTERS')),
      }))
    }

    default:
      return state
  }
}

export default factions
