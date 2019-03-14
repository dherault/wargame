/*
  The turn number
*/
const initialState = 1

function turn(state = initialState, action, globalState) {
  if (action.type === 'END_PLAYER_TURN') {
    const { factions, currentFaction } = globalState
    const factionIndex = factions.findIndex(faction => faction.id === currentFaction.id) + 1

    if (factionIndex >= factions.length) {
      return state + 1
    }

    return state
  }

  if (action.type === 'RESET_TURN') {
    return initialState
  }

  return state
}

export default turn
