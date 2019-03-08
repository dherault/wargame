/*
  A collection of booleans
*/

const initialState = {
  isPlaying: false,
  isEditing: false,
  isAiComputing: false,
  isLeftButtonDown: false,
  isRightButtonDown: false,
  isUnitMenuOpened: false,
  isBuildingMenuOpened: false,
  isFireSelection: false,
  isDeletingUnits: false,
  isFogOfWar: false,
  preventAutoZoom: false,
  delayComputerActions: true,
}

function booleans(state = initialState, action) {

  if (action.type === 'SET_BOOLEAN') {
    return {
      ...state,
      ...action.payload,
    }
  }

  if (action.type === 'RESET_BOOLEANS') {
    return {
      ...initialState,
      ...action.payload,
    }
  }

  return state
}

export default booleans
