import { randomArray, randomPop } from '../common/utils'

const tilesTypes = [
  'PLAIN',
  'PLAIN',
  'PLAIN',
  'PLAIN',
  'PLAIN',
  'ROAD',
  'ROAD',
  'ROAD',
  'ROAD',
  'FOREST',
  'MOUNTAIN',
  'RIVER',
]

function generateWorldMap(width = 20, seaWidth = 3) {
  const worldMap = []
  const landTiles = []
  const seaTiles = []
  const height = width

  for (let j = 0; j < height; j++) {
    const row = []
    
    for (let i = 0; i < width; i++) {
      const tile = i < seaWidth || i >= width - seaWidth || j < seaWidth || j >= height - seaWidth ? 'SEA' : randomArray(tilesTypes)
      row.push(tile)

      if (tile === 'PLAIN' || tile === 'ROAD') {
        landTiles.push({ x: i, y: j })
      }
      else if (tile === 'SEA') {
        seaTiles.push({ x: i, y: j })
      }
    }
    
    worldMap.push(row)
  }

  const buildings = [
    { type: 'HEADQUARTERS', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'HEADQUARTERS', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'HEADQUARTERS', factionId: 'YELLOW', position: randomPop(landTiles) },
    { type: 'CITY', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'CITY', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'CITY', factionId: null, position: randomPop(landTiles) },
    { type: 'CITY', factionId: null, position: randomPop(landTiles) },
    { type: 'BASE', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'BASE', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'BASE', factionId: null, position: randomPop(landTiles) },
  ]

  buildings.forEach(building => {
    worldMap[building.position.y][building.position.x] = building.type
  })

  const units = [
    { type: 'INFANTERY', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'INFANTERY', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'INFANTERY', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'TANK', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'ARTILLERY', factionId: 'BLUE', position: randomPop(landTiles) },
    { type: 'SUBMARINE', factionId: 'BLUE', position: randomPop(seaTiles) },
    { type: 'INFANTERY', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'INFANTERY', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'INFANTERY', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'TANK', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'ARTILLERY', factionId: 'RED', position: randomPop(landTiles) },
    { type: 'SUBMARINE', factionId: 'RED', position: randomPop(seaTiles) },
    { type: 'INFANTERY', factionId: 'YELLOW', position: randomPop(landTiles) },
    { type: 'SUBMARINE', factionId: 'YELLOW', position: randomPop(seaTiles) },
  ]

  const factions = [
    { id: 'BLUE', team: 1, type: 'HUMAN' }, 
    { id: 'RED', team: 2, type: 'COMPUTER' },
    { id: 'YELLOW', team: 3, type: 'COMPUTER' },
  ]

  return { 
    worldMap, 
    buildings, 
    units, 
    factions, 
    name: `Random ${width}x${width}`,
    description: 'A random challenge',
  }
}

export default generateWorldMap
