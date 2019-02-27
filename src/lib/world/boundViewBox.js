import store from '../../state/store'

export function boundViewBoxX(x, viewBoxWidth) {
  const { viewBox, worldMap } = store.getState()

  return Math.max(0, Math.min(worldMap[0].length - (viewBoxWidth || viewBox.width), x))
}

export function boundViewBoxY(y, viewBoxWidth) {
  const { viewBox, worldMap } = store.getState()
  const tileSize = window.innerWidth / (viewBoxWidth || viewBox.width) // pixel per tile
  const viewBoxHeight = Math.ceil(window.innerHeight / tileSize) // tiles
  
  return Math.max(0, Math.min(worldMap.length - viewBoxHeight + 1, y))
}

export function boundViewBoxWidth(width) {
  const { worldMap } = store.getState()

  const bound1 = Math.min(6, worldMap[0].length)
  // const bound2 = Math.max(worldMap[0].length, worldMap.length * window.innerWidth / window.innerHeight)
  const bound2 = worldMap[0].length
  
  return Math.max(bound1, Math.min(bound2, width))
}
