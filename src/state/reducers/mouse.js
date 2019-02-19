/*
  x
  y
  offsetX
  offsetY
  rightButtonDown
*/
function mouse(state = {}, action) {

  if (action.type === 'UPDATE_MOUSE_POSITION' || action.type === 'UPDATE_MOUSE_STATE') {
    return {
      ...state,
      ...action.payload,
    }
  }

  return state
}

export default mouse
