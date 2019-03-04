/*
  selected unit type for the editor (eg: 'INFANTERY')
*/
function selectedUnitType(state = null, action) {
  switch (action.type) {
    case 'SELECT_UNIT_TYPE':
      return action.payload
    
    case 'DESELECT_UNIT_TYPE':
      return null
      
    default:
      return state
  }
}

export default selectedUnitType
