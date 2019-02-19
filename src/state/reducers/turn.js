/*
  number
  faction
  playerType
*/
function turn(state = {}, action, globalState) {
  switch (action.type) {
    case 'SET_TURN':
      return action.payload
    
    case 'END_PLAYER_TURN':
      const { playOrder } = globalState
      let playOrderIndex = playOrder.findIndex(item => item.faction === state.faction) + 1
      let number = state.number

      if (playOrderIndex >= playOrder.length) {
        playOrderIndex = 0
        number++
      }

      return {
        number,
        ...playOrder[playOrderIndex],
      }

    default:
      return state
  }
}

export default turn
