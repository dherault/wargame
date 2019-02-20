/*
  faction
  team
  playerType
*/
function turnOrder(state = [], action) {
  switch (action.type) {
    case 'SET_TURN_ORDER':
      return action.payload

    default:
      return state
  }
}

export default turnOrder
