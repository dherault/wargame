/*
  {
    x
    goalX
    diffGoalX
    y
    goalY
    diffGoalY
    width
    goalWidth
    diffGoalWidth
    offsetX
    offsetY
  }
*/
function viewBox(state = {}, action, globalState) {
  switch (action.type) {

    case 'RESET_VIEW_BOX': {
      const { worldMap } = globalState
      const viewBoxWidth = worldMap[0].length
      const tileSize = window.innerWidth / viewBoxWidth // pixel per tile
      const viewBoxHeight = window.innerHeight / tileSize

      return {
        x: 0,
        goalX: 0,
        diffGoalX: 0,
        y: 0,
        goalY: 0,
        diffGoalY: 0,
        width: viewBoxWidth,
        goalWidth: viewBoxWidth,
        diffGoalWidth: 0,
        offsetX: viewBoxWidth > worldMap[0].length ? (window.innerWidth - worldMap[0].length * tileSize) / 2 : 0,
        offsetY: viewBoxHeight > worldMap.length ? (window.innerHeight - worldMap.length * tileSize) / 2 : 0,
      }
    }

    case 'UPDATE_VIEW_BOX':
    case 'RESIZE_VIEW_BOX': {
      const { worldMap } = globalState
      const viewBoxWidth = action.payload.width || state.width
      const tileSize = window.innerWidth / viewBoxWidth // pixel per tile
      const viewBoxHeight = window.innerHeight / tileSize

      return {
        ...state,
        ...action.payload,
        offsetX: viewBoxWidth > worldMap[0].length ? (window.innerWidth - worldMap[0].length * tileSize) / 2 : 0,
        offsetY: viewBoxHeight > worldMap.length ? (window.innerHeight - worldMap.length * tileSize) / 2 : 0,
      }
    }
    
    default:
      return state
  }
}

export default viewBox
