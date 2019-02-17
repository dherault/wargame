function viewBox(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_VIEW_BOX':
    case 'RESIZE_VIEW_BOX':
    return {
        ...state,
        ...action.payload,
      }
    
    default:
      return state
  }
}

export default viewBox