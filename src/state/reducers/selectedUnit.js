function selectedUnit(state = null, action) {
  switch (action.type) {
    case 'SELECT_UNIT':
      return action.payload
    
    case 'DESELECT_UNIT':
      return null
      
    default:
      return state
  }
}

export default selectedUnit
