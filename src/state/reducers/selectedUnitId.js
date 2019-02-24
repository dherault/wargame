/*
  the id of the selectedUnit
*/
function selectedUnitId(state = null, action) {
  switch (action.type) {
    case 'SELECT_UNIT_ID':
      return action.payload
    
    case 'DESELECT_UNIT_ID':
      return null
      
    default:
      return state
  }
}

export default selectedUnitId
