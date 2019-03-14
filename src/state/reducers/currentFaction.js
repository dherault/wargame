/*
  {
    id
    team
    type HUMAN/COMPUTER
    alive
  }
*/
function currentFaction(state = null, action, globalState, ongoingState) {
  switch (action.type) {
    case 'SET_CURRENT_FACTION':
      return action.payload
    
    case 'END_PLAYER_TURN': {
      const { factions } = ongoingState
      let factionIndex = factions.findIndex(faction => faction.id === state.id)

      while (true) {
        factionIndex++
        
        if (factionIndex >= factions.length) {
          factionIndex = 0
        }

        if (factions[factionIndex].alive) break
      }

      return factions[factionIndex]
    }

    default:
      return state
  }
}

export default currentFaction
