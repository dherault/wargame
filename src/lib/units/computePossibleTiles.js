import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'

const cache = {}
const fullHash = (x, y, type) => `${x}_${y}_${type}`
const hash = (x, y) => `${x}_${y}`
const unhash = string => {
  const [xs, ys] = string.split('_')

  return {
    x: parseInt(xs),
    y: parseInt(ys),
  }
}

function computePossibleTiles(unitPosition, unitType) {
  const hash = fullHash(unitPosition.x, unitPosition.y, unitType)

  if (cache[hash]) return cache[hash]

  const { worldMap } = store.getState()
  const unitConfiguration = gameConfiguration.unitsConfiguration[unitType]

  const tilesHashs = expandPossibleTiles(
    worldMap, 
    unitPosition.x, 
    unitPosition.y, 
    unitConfiguration.movementType,
    unitConfiguration.movement
  )
    
  const possibleTiles = []

  tilesHashs.forEach(tileHash => possibleTiles.push(unhash(tileHash)))
  
  return cache[hash] = possibleTiles
}

function checkTile(worldMap, x, y, movementType, remainingMovementPoints, tiles, neighbouringTiles) {
  if (worldMap[y][x]) {
    const tileHash = hash(x, y)

    if (!tiles.has(tileHash)) {
      const { type } = worldMap[y][x]
      const cost = gameConfiguration.tilesConfiguration[type].movementCost[movementType]
  
      if (cost >= remainingMovementPoints) {
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

function expandPossibleTiles(worldMap, x, y, movementType, remainingMovementPoints, tiles = new Set()) {
  if (remainingMovementPoints <= 0) return tiles

  const neighbouringTiles = []

  checkTile(worldMap, x - 1, y, movementType, remainingMovementPoints, tiles, neighbouringTiles, neighbouringTiles)
  checkTile(worldMap, x + 1, y, movementType, remainingMovementPoints, tiles, neighbouringTiles, neighbouringTiles)
  checkTile(worldMap, x, y - 1, movementType, remainingMovementPoints, tiles, neighbouringTiles, neighbouringTiles)
  checkTile(worldMap, x, y + 1, movementType, remainingMovementPoints, tiles, neighbouringTiles, neighbouringTiles)

  neighbouringTiles.forEach(({ x, y, remainingMovementPoints }) => {
    expandPossibleTiles(worldMap, x, y, movementType, remainingMovementPoints, tiles)
  })

  return tiles
}

export default computePossibleTiles