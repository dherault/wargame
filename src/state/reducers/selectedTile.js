function selectedTile(state = null, action) {
  switch (action.type) {
    case 'SELECT_TILE':
      return action.payload
    
    case 'DESELECT_TILE':
      return null
      
    default:
      return state
  }
}

export default selectedTile
