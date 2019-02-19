/*
  faction
  team
  playerType
*/
function turnOrder(state = [], action) {
  switch (action.type) {
    case 'SET_PLAY_ORDER':
      return action.payload

    default:
      return state
  }
}

export default turnOrder
