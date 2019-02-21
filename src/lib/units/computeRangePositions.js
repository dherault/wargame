import gameConfiguration from '../gameConfiguration'

const hash = (position, distance = 0) => `${position.x}_${position.y}_${distance}`
const unhash = string => {
  const [x, y, distance] = string.split('_')

  return [{ x: parseInt(x), y: parseInt(y) }, parseInt(distance)]
}

function computeRangePositions(store, unit, initialPosition) {
  const { range } = gameConfiguration.unitsConfiguration[unit.type]

  const positions = []

  const openSet = [hash(initialPosition || unit.position, 0)]
  const closedSet = new Set()

  while (openSet.length) {
    const positionAndDistanceHash = openSet.shift()
    const [position, distance] = unhash(positionAndDistanceHash)

    if (distance > range[1]) continue

    if (distance >= range[0]) positions.push(position)

    closedSet.add(hash(position))

    getSuccessors(store, position, distance, closedSet).forEach(positionAndDistanceHash => {

      if (openSet.indexOf(positionAndDistanceHash) === -1) {
        openSet.push(positionAndDistanceHash)
      }
    })

  }

  return positions
}

function getSuccessors(store, position, distance, closedSet) {
  const { worldMap } = store.getState()
  const { x, y } = position
  const successors = []

  checkSuccessor(worldMap, { x: x - 1, y }, distance + 1, closedSet, successors)
  checkSuccessor(worldMap, { x: x + 1, y }, distance + 1, closedSet, successors)
  checkSuccessor(worldMap, { x, y: y - 1 }, distance + 1, closedSet, successors)
  checkSuccessor(worldMap, { x, y: y + 1 }, distance + 1, closedSet, successors)

  return successors
}

function checkSuccessor(worldMap, position, distance, closedSet, successors) {
  if (worldMap[position.y] && worldMap[position.y][position.x] && !closedSet.has(hash(position))) successors.push(hash(position, distance))
}

export default computeRangePositions