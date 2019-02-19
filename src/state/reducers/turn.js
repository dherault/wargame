/*
  number
  faction
  team
  playerType
*/
function turn(state = {}, action, globalState) {
  switch (action.type) {
    case 'SET_TURN':
      return action.payload
    
    case 'END_PLAYER_TURN':
      const { turnOrder } = globalState
      let turnOrderIndex = turnOrder.findIndex(item => item.faction === state.faction) + 1
      let number = state.number

      if (turnOrderIndex >= turnOrder.length) {
        turnOrderIndex = 0
        number++
      }

      return {
        number,
        ...turnOrder[turnOrderIndex],
      }

    default:
      return state
  }
}

export default turn
