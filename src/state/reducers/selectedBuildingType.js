/*
  selected building type for the editor (eg: 'CITY')
*/
function selectedBuildingType(state = null, action) {
  switch (action.type) {
    case 'SELECT_BUILDING_TYPE':
      return action.payload
    
    case 'DESELECT_BUILDING_TYPE':
      return null
      
    default:
      return state
  }
}

export default selectedBuildingType
