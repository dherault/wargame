/*
  An array of buildings
*/
function buildings(state = [], action, globalState) {
  switch (action.type) {
    case 'SET_BUILDINGS':
      return action.payload

    default:
      return state
  }
}

export default buildings
