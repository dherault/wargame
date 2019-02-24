import { takeEvery, put, delay } from 'redux-saga/effects'
import store from '../store'
import computeAiActions from '../../lib/ai/computeAiActions'

function* playAi() {
  const { currentFaction } = store.getState()

  if (currentFaction.type !== 'COMPUTER') return 
    
  yield put({ type: 'BEGIN_AI_COMPUTATION' })
  console.log('_____BEGIN_AI_____')

  // let error
  // let actions

  // try {
  //   actions = computeAiActions()
  // }
  // catch(err) {
  //   error = err
  // }
  // finally {
  //   if (!error) window.reset()
  //   else console.error(error)
  // }

  const actions = computeAiActions()

  console.log('ai actions', actions)

  // if (actions.length === 0) throw new Error('no ai actions')

  console.log('_____END_AI_____')
  yield put({ type: 'END_AI_COMPUTATION' })

  for (let i = 0; i < actions.length; i++) {
    yield delay(25)
    yield put(actions[i])
  } 

  setTimeout(() => {
    store.dispatch({ type: 'END_PLAYER_TURN' })
    store.dispatch({ type: 'BEGIN_PLAYER_TURN' })
  }, 500)
}

function* aiSaga() {
  yield takeEvery('BEGIN_PLAYER_TURN', playAi)
}

export default aiSaga
