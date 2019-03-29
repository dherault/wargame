import { minViewBoxWidth } from '../../lib/common/world/boundViewBox'

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
      const viewBoxWidth = Math.max(minViewBoxWidth, worldMap[0].length)
      const { width, height } = window.canvas
      const tileSize = width / viewBoxWidth // pixel per tile
      const viewBoxHeight = height / tileSize

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
        offsetX: viewBoxWidth > worldMap[0].length ? (width - worldMap[0].length * tileSize) / 2 : 0,
        offsetY: viewBoxHeight > worldMap.length ? (height - worldMap.length * tileSize) / 2 : 0,
      }
    }

    case 'UPDATE_VIEW_BOX':
    case 'RESIZE_VIEW_BOX': {
      const { worldMap } = globalState
      const viewBoxWidth = action.payload.width || state.width
      const tileSize = window.canvas.width / viewBoxWidth // pixel per tile
      const viewBoxHeight = window.canvas.height / tileSize

      return {
        ...state,
        ...action.payload,
        offsetX: viewBoxWidth > worldMap[0].length ? (window.canvas.width - worldMap[0].length * tileSize) / 2 : 0,
        offsetY: viewBoxHeight > worldMap.length ? (window.canvas.height - worldMap.length * tileSize) / 2 : 0,
      }
    }

    default:
      return state
  }
}

export default viewBox
