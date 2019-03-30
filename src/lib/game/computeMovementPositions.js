import Heap from '../common/Heap'
import gameConfiguration from '../gameConfiguration'
import { samePosition, hash, unhash } from '../common/utils'

// Uniform cost search to expand movement positions
function computeMovementPositions(store, unit) {
  const { units } = store.getState()
  const { movement } = gameConfiguration.unitsConfiguration[unit.type]

  const getSuccessors = getSuccessorsFactory(store, unit)

  const positions = [unit.position]
  const openSet = new Heap()
  const closedSet = new Set()

  openSet.insert(0, hash(unit.position))

  while (openSet.size) {
    // Extract first candidate from heap
    const [cost, positionHash] = openSet.extractMin()
    const position = unhash(positionHash)

    // If cost is larger than possible movement, ignore candidate
    if (cost > movement) continue

    // If there is no unit on the position, add the position to the results
    // If there is a mergable unit on the position, add the position to the results
    const unitOnPosition = units.find(u => samePosition(u.position, position))
    if (!unitOnPosition || (unitOnPosition.type === unit.type && unit.life < 100 && unitOnPosition.life < 100)) {
      positions.push(position)
    }

    closedSet.add(hash(position))

    // For each successor (adjacent position with updated cost)
    getSuccessors(position, cost).forEach(({ position, cost }) => {
      const positionHash = hash(position)

      if (closedSet.has(positionHash)) return

      // If the position is not already in the heap
      if (!openSet.has(positionHash)) {
        openSet.insert(cost, positionHash)
      }
    })

  }

  return positions
}

// export for computeAiActions
export function getSuccessorsFactory(store, unit) {
  const { worldMap, units } = store.getState()
  const { terrainConfiguration } = gameConfiguration
  const { movementType } = gameConfiguration.unitsConfiguration[unit.type]
  const ennemyUnits = units.filter(u => u.team !== unit.team)

  // Check for a given position if the tile exists
  // If yes, puts it in successors with its updated cost
  const checkSuccessor = (position, cost, successors) => {
    const tile = worldMap[position.y] && worldMap[position.y][position.x]

    if (tile) {
      successors.push({
        position,
        cost: cost + terrainConfiguration[tile].movementCost[movementType],
      })
    }
  }

  // Get adjacent tiles position and cost for a given unit movement type
  return function getSuccessors(position, cost) {
    // Enemy unit block passage, friendly ones do not
    if (ennemyUnits.some(unit => samePosition(unit.position, position))) {
      return []
    }

    const { x, y } = position
    const successors = []

    checkSuccessor({ x: x - 1, y }, cost, successors)
    checkSuccessor({ x: x + 1, y }, cost, successors)
    checkSuccessor({ x, y: y - 1 }, cost, successors)
    checkSuccessor({ x, y: y + 1 }, cost, successors)

    return successors
  }
}

export default computeMovementPositions
