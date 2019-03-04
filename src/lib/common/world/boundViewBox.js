import store from '../../../state/store'

export function boundViewBoxX(x, viewBoxWidth) {
  const { viewBox, worldMap } = store.getState()

  return Math.max(0, Math.min(worldMap[0].length - (viewBoxWidth || viewBox.width), x))
}

export function boundViewBoxY(y, viewBoxWidth) {
  const { viewBox, worldMap } = store.getState()
  const tileSize = window.canvas.width / (viewBoxWidth || viewBox.width) // pixel per tile
  const viewBoxHeight = Math.ceil(window.canvas.height / tileSize) // tiles
  
  return Math.max(0, Math.min(worldMap.length - viewBoxHeight + 1, y))
}

export function boundViewBoxWidth(width) {
  const { worldMap } = store.getState()

  const bound1 = 6
  // const bound1 = Math.min(6, worldMap[0].length)
  // const bound2 = Math.max(worldMap[0].length, worldMap.length * window.canvas.width / window.canvas.height)
  const bound2 = worldMap[0].length
  
  return Math.max(bound1, Math.min(bound2, width))
}
