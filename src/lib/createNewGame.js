import store from '../state/store'
// import gameConfiguration from './gameConfiguration'
import generateWorldMap from './world/generateWorldMap'
import { createId, randomPop } from './utils'

function createNewGame() {
  console.log('Creating new game')

  const worldMap = generateWorldMap()
  
  const landTiles = []
  const seaTiles = []

  worldMap.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 'ROAD' || tile === 'PLAIN') {
        landTiles.push({ x, y })
      }
      else if (tile === 'SEA') {
        seaTiles.push({ x, y })
      }
    })
  })

  const buildings = [
    { type: 'CITY', factionId: 'BLUE', team: 1, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'CITY', factionId: 'RED',  team: 2, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'CITY', factionId: null,   team: 0, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'CITY', factionId: null,   team: 0, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'BASE', factionId: 'BLUE', team: 1, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'BASE', factionId: 'RED',  team: 2, capture: 100, position: randomPop(landTiles), id: createId() },
    { type: 'BASE', factionId: null,   team: 0, capture: 100, position: randomPop(landTiles), id: createId() },
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
    { id: 'BLUE', team: 1, type: 'COMPUTER' }, 
    { id: 'RED', team: 2, type: 'COMPUTER' },
    { id: 'YELLOW', team: 3, type: 'HUMAN' },
  ]

  const moneyByFaction = {}

  factions.forEach(faction => moneyByFaction[faction.id] = 0)

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: worldMap,
  })

  store.dispatch({
    type: 'UPDATE_VIEW_BOX',
    payload: {
      x: 0,
      y: 0,
      goalX: 0,
      goalY: 0,
      width: worldMap[0].length,
      goalWidth: worldMap[0].length,
    },
  })

  store.dispatch({
    type: 'SET_BUILDINGS',
    payload: buildings,
  })

  store.dispatch({
    type: 'SET_UNITS',
    payload: units,
  })

  store.dispatch({
    type: 'SET_FACTIONS',
    payload: factions,
  })

  store.dispatch({
    type: 'SET_CURRENT_FACTION',
    payload: factions[0],
  })

  store.dispatch({
    type: 'SET_MONEY_BY_FACTION',
    payload: moneyByFaction,
  })

  store.dispatch({
    type: 'BEGIN_PLAYER_TURN',
  })
}

export default createNewGame
