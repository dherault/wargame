function currentFaction(state = {}, action, globalState) {
  switch (action.type) {
    case 'SET_CURRENT_FACTION':
      return action.payload
    
    case 'END_PLAYER_TURN':
      const { factions, units } = globalState

      let factionIndex = factions.findIndex(faction => faction.id === state.id)

      while (true) {
        factionIndex++

        if (factionIndex >= factions.length) {
          factionIndex = 0
        }

        // eslint-disable-next-line no-loop-func
        if (units.some(unit => unit.factionId === factions[factionIndex].id)) {
          break
        }
      }

      return factions[factionIndex]

    default:
      return state
  }
}

export default currentFaction
