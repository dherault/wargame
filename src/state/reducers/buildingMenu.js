function buildingMenu(state = { opened: false }, action) {
  switch (action.type) {
    case 'OPEN_BUILDING_MENU':
      return {
        ...state,
        opened: true,
      }
    
    case 'CLOSE_BUILDING_MENU':
      return {
        ...state,
        opened: false,
      }
    
    default:
      return state
  }
}

export default buildingMenu
