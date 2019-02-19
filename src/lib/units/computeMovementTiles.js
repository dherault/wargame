import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'

const hash = (x, y) => `${x}_${y}`
const unhash = string => {
  const [xs, ys] = string.split('_')

  return {
    x: parseInt(xs),
    y: parseInt(ys),
  }
}

// TODO ? compute units hash and cache result
// TODO ? use BFS
function computePossibleTiles(unit) {
  const { worldMap, units } = store.getState()
  const unitConfiguration = gameConfiguration.unitsConfiguration[unit.type]
  const unitsPositionsHashs = new Set()

  units.forEach(u => unitsPositionsHashs.add(hash(u.position.x, u.position.y)))

  const tilesHashs = expandPossibleTiles(
    worldMap,
    unitsPositionsHashs, 
    unit.position.x, 
    unit.position.y, 
    unitConfiguration.movementType,
    unitConfiguration.movement
  )

  const possibleTiles = []

  tilesHashs.forEach(tileHash => possibleTiles.push(unhash(tileHash)))
  
  return possibleTiles
}

function expandPossibleTiles(worldMap, unitsPositionsHashs, x, y, movementType, remainingMovementPoints, tiles = new Set()) {
  if (remainingMovementPoints <= 0) return tiles

  const neighbouringTiles = []

  checkTile(worldMap, unitsPositionsHashs, x - 1, y, movementType, remainingMovementPoints, tiles, neighbouringTiles)
  checkTile(worldMap, unitsPositionsHashs, x + 1, y, movementType, remainingMovementPoints, tiles, neighbouringTiles)
  checkTile(worldMap, unitsPositionsHashs, x, y - 1, movementType, remainingMovementPoints, tiles, neighbouringTiles)
  checkTile(worldMap, unitsPositionsHashs, x, y + 1, movementType, remainingMovementPoints, tiles, neighbouringTiles)

  neighbouringTiles.forEach(({ x, y, remainingMovementPoints }) => {
    expandPossibleTiles(worldMap, unitsPositionsHashs, x, y, movementType, remainingMovementPoints, tiles)
  })

  return tiles
}

function checkTile(worldMap, unitsPositionsHashs, x, y, movementType, remainingMovementPoints, tiles, neighbouringTiles) {
  if (worldMap[y] && worldMap[y][x]) {
    const tileHash = hash(x, y)

    if (!(tiles.has(tileHash) || unitsPositionsHashs.has(tileHash))) {
      const { type } = worldMap[y][x]
      const cost = gameConfiguration.tilesConfiguration[type].movementCost[movementType]
      
      if (cost <= remainingMovementPoints) {
        tiles.add(tileHash)
        neighbouringTiles.push({ 
          x, 
          y, 
          remainingMovementPoints: remainingMovementPoints - cost 
        })
      }
    }
  }
}

export default computePossibleTiles