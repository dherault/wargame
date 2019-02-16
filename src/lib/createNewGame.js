import store from '../state/store'
import generateWorldMap from './world/generateWorldMap'

function createNewGame() {
  console.log('Creating new game')

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: generateWorldMap(),
  })
}

export default createNewGame
