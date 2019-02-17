import store from '../state/store'
import gameConfiguration from './gameConfiguration'
import generateWorldMap from './world/generateWorldMap'

function createNewGame() {
  console.log('Creating new game')

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: generateWorldMap(),
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
