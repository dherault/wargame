function worldMap(state = null, action) {
  switch (action.type) {
    case 'SET_WORLD_MAP':
      return action.payload

    default:
      return state
  }
}

export default worldMap
