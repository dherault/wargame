import store from '../state/store'
// import gameConfiguration from './gameConfiguration'
import generateWorldMap from './world/generateWorldMap'
import { randomPop } from './utils'

function createNewGame() {
  console.log('Creating new game')

  const worldMap = generateWorldMap()
  
  const grassTiles = []

  worldMap.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile.type === 'ROAD') {
        grassTiles.push({ x, y })
      }
    })
  })

  const units = [
    { type: 'INFANTERY', faction: 'BLUE', life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'BLUE', life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'BLUE', life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'TANK',      faction: 'BLUE', life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'ARTILLERY', faction: 'BLUE', life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED',  life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED',  life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED',  life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'TANK',      faction: 'RED',  life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'ARTILLERY', faction: 'RED',  life: 100, played: false, position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
  ]

  const playOrder = [
    { faction: 'BLUE', playerType: 'HUMAN' }, 
    { faction: 'RED', playerType: 'HUMAN' },
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
    payload: playOrder,
  })

  store.dispatch({
    type: 'SET_TURN',
    payload: {
      number: 1,
      ...playOrder[0],
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
