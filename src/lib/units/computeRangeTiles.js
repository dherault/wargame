import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'

const hash = (tile, distance = 0) => `${tile.x}_${tile.y}_${distance}`
const unhash = string => {
  const [x, y, distance] = string.split('_')

  return [{ x: parseInt(x), y: parseInt(y) }, parseInt(distance)]
}

function computeRangeTiles(unit, position) {
  const { range } = gameConfiguration.unitsConfiguration[unit.type]

  const tiles = []

  const openSet = [hash(position || unit.position, 0)]
  const closedSet = new Set()
  const visitedSet = new Set()

  while (openSet.length) {
    const tileAndDistanceHash = openSet.shift()
    const [tile, distance] = unhash(tileAndDistanceHash)

    if (distance > range[1]) continue

    if (distance >= range[0]) tiles.push(tile)

    closedSet.add(tileAndDistanceHash)
    visitedSet.add(hash(tile))

    getSuccessors(tile, distance, visitedSet).forEach(tileAndDistanceHash => {
      if (closedSet.has(tileAndDistanceHash)) return

      if (openSet.indexOf(tileAndDistanceHash) === -1) {
        openSet.push(tileAndDistanceHash)
      }
    })

  }

  return tiles
}

function getSuccessors(tile, distance, visitedSet) {
  const { worldMap } = store.getState()
  const { x, y } = tile
  const successors = []

  checkSuccessor(worldMap, { x: x - 1, y }, distance + 1, visitedSet, successors)
  checkSuccessor(worldMap, { x: x + 1, y }, distance + 1, visitedSet, successors)
  checkSuccessor(worldMap, { x, y: y - 1 }, distance + 1, visitedSet, successors)
  checkSuccessor(worldMap, { x, y: y + 1 }, distance + 1, visitedSet, successors)

  return successors
}

function checkSuccessor(worldMap, tile, distance, visitedSet, successors) {
  if (worldMap[tile.y] && worldMap[tile.y][tile.x] && !visitedSet.has(hash(tile))) successors.push(hash(tile, distance))
}

export default computeRangeTiles