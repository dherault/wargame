import store from '../state/store'
// import gameConfiguration from './gameConfiguration'
import generateWorldMap from './world/generateWorldMap'
import { randomPop } from './utils'

function createNewGame() {
  console.log('Creating new game')

  const worldMap = generateWorldMap()
  
  const landTiles = []
  const seaTiles = []

  worldMap.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile.type === 'ROAD') {
        landTiles.push({ x, y })
      }
      else if (tile.type === 'SEA') {
        seaTiles.push({ x, y })
      }
    })
  })

  const units = [
    { type: 'INFANTERY', faction: 'BLUE', team: 1, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'BLUE', team: 1, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'BLUE', team: 1, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'TANK',      faction: 'BLUE', team: 1, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'ARTILLERY', faction: 'BLUE', team: 1, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'SUBMARINE', faction: 'BLUE', team: 1, life: 100, played: false, position: randomPop(seaTiles),  id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED',  team: 2, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED',  team: 2, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED',  team: 2, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'TANK',      faction: 'RED',  team: 2, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'ARTILLERY', faction: 'RED',  team: 2, life: 100, played: false, position: randomPop(landTiles), id: Math.random().toString().slice(2) },
    { type: 'SUBMARINE', faction: 'RED',  team: 2, life: 100, played: false, position: randomPop(seaTiles),  id: Math.random().toString().slice(2) },
  ]

  const turnOrder = [
    { faction: 'BLUE', team: 1, playerType: 'HUMAN' }, 
    { faction: 'RED', team: 2, playerType: 'HUMAN' },
    // { faction: 'RED', playerType: 'COMPUTER' },
  ]

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: worldMap,
  })

  store.dispatch({
    type: 'SET_UNITS',
    payload: units,
  })

  store.dispatch({
    type: 'SET_PLAY_ORDER',
    payload: turnOrder,
  })

  store.dispatch({
    type: 'SET_TURN',
    payload: {
      number: 1,
      ...turnOrder[0],
    },
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
}

export default createNewGame
