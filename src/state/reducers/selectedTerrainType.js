/*
  selected terrain type for the editor (eg: 'PLAIN')
*/
function selectedTerrainType(state = null, action) {
  switch (action.type) {
    case 'SELECT_TERRAIN_TYPE':
      return action.payload
    
    case 'DESELECT_TERRAIN_TYPE':
      return null
      
    default:
      return state
  }
}

export default selectedTerrainType
