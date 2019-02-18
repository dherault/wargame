function unitMenu(state = { opened: false }, action) {
  switch (action.type) {
    case 'OPEN_UNIT_MENU':
      return {
        opened: true,
        ...action.payload,
      }
    
    case 'CLOSE_UNIT_MENU':
      return {
        opened: false,
      }

    default:
      return state
  }
}

export default unitMenu
