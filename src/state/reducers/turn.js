/*
  The turn number
*/
function turn(state = 1, action, globalState) {
  if (action.type === 'END_PLAYER_TURN') {
    const { factions, currentFaction } = globalState
    let factionIndex = factions.findIndex(faction => faction.id === currentFaction.id) + 1

    if (factionIndex >= factions.length) {
      return state + 1
    }

    return state
  }

  return state
}

export default turn