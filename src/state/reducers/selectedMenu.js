function selectedMenu(state = null, action) {
  if (action.type === 'SELECT_MENU') {
    return action.payload
  }

  if (action.type === 'DESELECT_MENU') {
    return null
  }

  return state
}

export default selectedMenu
