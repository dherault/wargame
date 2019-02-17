function turn(state = {}, action) {
  switch (action.type) {
    case 'SET_TURN':
      return action.payload

    default:
      return state
  }
}

export default turn
