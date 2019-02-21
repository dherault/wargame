/*
  number
  factionId
  team
  playerType
*/
function turn(state = {}, action, globalState) {
  switch (action.type) {
    case 'SET_TURN':
      return action.payload
    
    case 'END_PLAYER_TURN':
      const { factions } = globalState
      let factionIndex = factions.findIndex(faction => faction.id === state.faction.id) + 1
      let number = state.number

      if (factionIndex >= factions.length) {
        factionIndex = 0
        number++
      }

      return {
        number,
        faction: factions[factionIndex],
      }

    default:
      return state
  }
}

export default turn
