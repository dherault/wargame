function unitMenu(state = { opened: false }, action) {
  switch (action.type) {
    case 'OPEN_UNIT_MENU':
      return {
        ...state,
        opened: true,
        awaitFireSelection: false,
      }
    
    case 'CLOSE_UNIT_MENU':
      return {
        ...state,
        opened: false,
      }
    
    case 'AWAIT_FIRE_SELECTION': 
      return {
        ...state,
        awaitFireSelection: true,
      }

    case 'CANCEL_FIRE_SELECTION':
      return {
        ...state,
        awaitFireSelection: false,
      }
      
    default:
      return state
  }
}

export default unitMenu
