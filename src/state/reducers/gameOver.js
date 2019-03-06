function gameOver(state = false, action, globalState, ongoingState) {
  switch (action.type) {
    case 'CAPTURE': {
      const { buildings } = ongoingState
      const remainingHqTeams = new Set()

      buildings.forEach(building => {
        if (building.type === 'HEADQUARTERS') {
          remainingHqTeams.add(building.team)
        }
      })

      return remainingHqTeams.size === 1
    }

    case 'KILL_UNIT': {
      const { units } = ongoingState
      const remainingUnitsTeams = new Set()

      units.forEach(unit => {
        remainingUnitsTeams.add(unit.team)
      })

      return remainingUnitsTeams.size === 1
    }

    default:
      return state
  }
}

export default gameOver
