function currentFaction(state = {}, action, globalState) {
  switch (action.type) {
    case 'SET_CURRENT_FACTION':
      return action.payload
    
    case 'END_PLAYER_TURN':
      const { factions } = globalState
      let factionIndex = factions.findIndex(faction => faction.id === state.id) + 1

      if (factionIndex >= factions.length) {
        factionIndex = 0
      }

      return factions[factionIndex]

    default:
      return state
  }
}

export default currentFaction
