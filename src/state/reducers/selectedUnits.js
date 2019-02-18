function selectedUnits(state = [], action) {
  switch (action.type) {
    case 'SELECT_UNIT_0':
      return [
        action.payload,
      ]
    
    case 'SELECT_UNIT_1': 
      return [
        state[0],
        action.payload,
      ]

    case 'DESELECT_UNITS':
      return []
      
    default:
      return state
  }
}

export default selectedUnits
