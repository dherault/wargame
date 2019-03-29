/*
  The mouse's position
  {
    x
    y
  }
*/
function mouse(state = { x: 0, y: 0 }, action) {

  if (action.type === 'UPDATE_MOUSE_POSITION') {
    return action.payload
  }

  return state
}

export default mouse
