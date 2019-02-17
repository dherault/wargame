function mouse(state = {}, action) {

  if (action.type === 'UPDATE_MOUSE_POSITION') {
    return {
      ...state,
      ...action.payload,
    }
  }

  return state
}

export default mouse
