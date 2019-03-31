import { getRemainingTeams } from '../../lib/common/helpers'

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

      const remainingTeams = getRemainingTeams(buildings, units)

      // gameOver if there is only one team remaining
      return remainingTeams.length <= 1
    }

    case 'RESET_GAME_OVER': {
      return false
    }

    default:
      return state
  }
}

export default gameOver
