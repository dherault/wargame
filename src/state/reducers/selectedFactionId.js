/*
  selected faction id for the editor (eg: 'BLUE')
*/
function selectedFactionId(state = null, action) {
  switch (action.type) {
    case 'SELECT_FACTION_ID':
      return action.payload
    
    case 'DESELECT_FACTION_ID':
      return null
      
    default:
      return state
  }
}

export default selectedFactionId
