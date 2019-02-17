function playOrder(state = null, action) {
  switch (action.type) {
    case 'SET_PLAY_ORDER':
      return action.payload

    default:
      return state
  }
}

export default playOrder
