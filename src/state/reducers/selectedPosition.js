function selectedPosition(state = null, action) {
  switch (action.type) {
    case 'SELECT_POSITION':
      return action.payload
    
    case 'DESELECT_POSITION':
      return null
      
    default:
      return state
  }
}

export default selectedPosition
