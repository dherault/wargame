/*
  x
  y
  offsetX // TODO: remove offsetX and offsetY
  offsetY
  rightButtonDown
*/
function mouse(state = { x: 0, y: 0 }, action) {

  if (action.type === 'UPDATE_MOUSE_POSITION' || action.type === 'UPDATE_MOUSE_STATE') {
    return {
      ...state,
      ...action.payload,
    }
  }

  return state
}

export default mouse
