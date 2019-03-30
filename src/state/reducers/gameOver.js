/*
  boolean
  Is the game over
*/
function gameOver(state = false, action, globalState, ongoingState) {
  switch (action.type) {

    case 'KILL_UNIT':
    case 'CAPTURE':
    case 'SET_UNITS':
    case 'SET_BUILDINGS':
    case 'END_PLAYER_TURN': {
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

    case 'RESET_GAME_OVER': {
      return false
    }

    default:
      return state
  }
}

export default gameOver
