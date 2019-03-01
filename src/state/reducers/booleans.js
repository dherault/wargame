/*
  A collection of booleans
*/

const initialState = {
  isAiComputing: false,
  isRightButtonDown: false,
  isUnitMenuOpened: false,
  isBuildingMenuOpened: false,
  isFireSelection: false,
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

  return state
}

export default booleans
