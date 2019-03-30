/*
  A collection of booleans
*/

const initialState = {
  isLeftButtonDown: false,
  isRightButtonDown: false,
  isNewTurnAnimation: false,
  isUnitMenuOpened: false,
  isBuildingMenuOpened: false,
  isDevPanelOpened: false,
  isFireSelection: false,
  isDeletingUnits: false,
  isFlippingUnits: false,
  isFogOfWar: false,
  disableAutoZoom: false,
  disableDelayOnComputerActions: false,
  disableNewTurnAnimation: false,
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
