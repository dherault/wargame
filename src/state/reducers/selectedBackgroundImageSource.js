/*
  selected background image source for the editor
*/
function selectedBackgroundImageSource(state = null, action) {
  switch (action.type) {
    case 'SELECT_BACKGROUND_IMAGE_SOURCE':
      return action.payload

    case 'DESELECT_BACKGROUND_IMAGE_SOURCE':
      return null

    default:
      return state
  }
}

export default selectedBackgroundImageSource
