import gameConfiguration from '../gameConfiguration'
import { hashPositionAndDistance as hash, unhashPositionAndDistance as unhash, hash as simpleHash, samePosition } from '../common/utils'
import { getSuccessors } from './computeRangePositions'
import buildings from '../../state/reducers/buildings';

function computeVisionPositionsHashes(store) {
  const { buildings, units, worldMap, currentFaction: { team } } = store.getState()

  const visionPositionHashes = new Set()

  buildings.forEach(building => {
    if (building.team !== team) return

    visionPositionHashes.add(simpleHash(building.position))
  })

  units.forEach(unit => {
    // We compute the vision only for the current team
    if (unit.team !== team) return 

    let { vision } = gameConfiguration.unitsConfiguration[unit.type]

    // If an infantery is on a mountain it gain a +3 vision bonus
    if (
      gameConfiguration.infanteryUnitTypes.includes(unit.type)
      && worldMap[unit.position.y][unit.position.x] === 'MOUNTAIN'
    ) {
      vision += gameConfiguration.infanteryVisionBonusOnMountains
    }

    const unitVisionPositions = computeVisionPositions(store, unit.position, vision)

    // console.log('unitVisionPositions', unit.type, unit.id, unitVisionPositions)

    unitVisionPositions.forEach(position => visionPositionHashes.add(simpleHash(position)))
  })

  // console.log('visionPositionHashes', visionPositionHashes)

  return visionPositionHashes
}

// Breath-first search
function computeVisionPositions(store, initialPosition, vision) {
  const { worldMap } = store.getState()
  const positions = []

  const openSet = [hash(initialPosition, 0)]
  const closedSet = new Set()

  while (openSet.length) {
    const positionAndDistanceHash = openSet.shift()
    const [position, distance] = unhash(positionAndDistanceHash)

    if (distance > vision) continue

    if (gameConfiguration.hideoutTerrainTypes.includes(worldMap[position.y][position.x])) {
      if (
        samePosition(position, { x: initialPosition.x + 1, y: initialPosition.y })
        || samePosition(position, { x: initialPosition.x - 1, y: initialPosition.y })
        || samePosition(position, { x: initialPosition.x, y: initialPosition.y + 1 })
        || samePosition(position, { x: initialPosition.x, y: initialPosition.y - 1 })
      ) {
        positions.push(position)
      }
    }
    else {
      positions.push(position)
    }

    closedSet.add(hash(position))

    getSuccessors(store, position, distance, closedSet).forEach(positionAndDistanceHash => {
      if (openSet.indexOf(positionAndDistanceHash) === -1) {
        openSet.push(positionAndDistanceHash)
      }
    })

  }

  return positions
}

export default computeVisionPositionsHashes
