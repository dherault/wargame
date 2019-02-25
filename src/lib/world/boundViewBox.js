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

  return Math.max(6, Math.min(worldMap[0].length, width))
}