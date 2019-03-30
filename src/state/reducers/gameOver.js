/*
  boolean
  Is the game over
*/
function gameOver(state = false, action, globalState, ongoingState) {
  if (['KILL_UNIT', 'CAPTURE', 'SET_UNITS', 'SET_BUILDINGS', 'END_PLAYER_TURN'].includes(action.type)) {
    const { buildings, units, turn } = ongoingState

    if (turn === 1) return false

    const remainingHqTeams = new Set()

    buildings.forEach(building => {
      if (building.type === 'HEADQUARTERS') {
        remainingHqTeams.add(building.team)
      }
    })

    const remainingUnitsTeams = new Set()

    units.forEach(unit => {
      remainingUnitsTeams.add(unit.team)
    })

    // gameOver if there is only one team remaining
    return remainingHqTeams.size <= 1 || remainingUnitsTeams.size <= 1
  }

  return state
}

export default gameOver
