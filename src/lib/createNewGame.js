import store from '../state/store'
import gameConfiguration from './gameConfiguration'
import generateWorldMap from './world/generateWorldMap'
import { randomPop } from './utils'

function createNewGame() {
  console.log('Creating new game')

  const worldMap = generateWorldMap()
  
  const grassTiles = []

  worldMap.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile.type === 'GRASS') {
        grassTiles.push({ x, y })
      }
    })
  })

  const units = [
    { type: 'INFANTERY', faction: 'BLUE', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'BLUE', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'BLUE', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'TANK', faction: 'BLUE', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'INFANTERY', faction: 'RED', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
    { type: 'TANK', faction: 'RED', position: randomPop(grassTiles), id: Math.random().toString().slice(2) },
  ]

  store.dispatch({
    type: 'SET_UNITS',
    payload: units,
  })

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
      width: gameConfiguration.initialViewBoxWidth,
      goalWidth: gameConfiguration.initialViewBoxWidth,
    },
  })
}

export default createNewGame
