import { randomArray, randomPop, createId } from '../utils'

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
    { type: 'HEADQUARTERS', factionId: 'BLUE',   team: 1, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'HEADQUARTERS', factionId: 'RED',    team: 2, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'HEADQUARTERS', factionId: 'YELLOW', team: 3, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'CITY',         factionId: 'BLUE',   team: 1, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'CITY',         factionId: 'RED',    team: 2, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'CITY',         factionId: null,     team: 0, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'CITY',         factionId: null,     team: 0, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'BASE',         factionId: 'BLUE',   team: 1, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'BASE',         factionId: 'RED',    team: 2, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'BASE',         factionId: null,     team: 0, capture: 100, position: randomPop(landTiles), id: createId() },
  ]

  buildings.forEach(building => {
    worldMap[building.position.y][building.position.x] = 'BUILDING'
  })

  const units = [
    { type: 'INFANTERY', factionId: 'BLUE',   team: 1, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'INFANTERY', factionId: 'BLUE',   team: 1, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'INFANTERY', factionId: 'BLUE',   team: 1, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'TANK',      factionId: 'BLUE',   team: 1, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'ARTILLERY', factionId: 'BLUE',   team: 1, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'SUBMARINE', factionId: 'BLUE',   team: 1, life: 100, played: false, position: randomPop(seaTiles),  id: createId() },
    { type: 'INFANTERY', factionId: 'RED',    team: 2, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'INFANTERY', factionId: 'RED',    team: 2, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'INFANTERY', factionId: 'RED',    team: 2, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'TANK',      factionId: 'RED',    team: 2, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'ARTILLERY', factionId: 'RED',    team: 2, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'SUBMARINE', factionId: 'RED',    team: 2, life: 100, played: false, position: randomPop(seaTiles),  id: createId() },
    { type: 'INFANTERY', factionId: 'YELLOW', team: 3, life: 100, played: false, position: randomPop(landTiles), id: createId() },
    { type: 'SUBMARINE', factionId: 'YELLOW', team: 3, life: 100, played: false, position: randomPop(seaTiles),  id: createId() },
  ]

  const factions = [
    { id: 'BLUE',   team: 1, alive: true, type: 'HUMAN' }, 
    { id: 'RED',    team: 2, alive: true, type: 'COMPUTER' },
    { id: 'YELLOW', team: 3, alive: true, type: 'COMPUTER' },
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