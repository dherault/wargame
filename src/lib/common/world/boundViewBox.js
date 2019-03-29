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

export const minViewBoxWidth = 8

export function boundViewBoxWidth(width) {
  const { worldMap, router } = store.getState()

  const bound = router.location.pathname === '/editor'
    ? Math.max(worldMap[0].length, worldMap.length * window.canvas.width / window.canvas.height)
    : worldMap[0].length

  return Math.max(minViewBoxWidth, Math.min(bound, width))
}
