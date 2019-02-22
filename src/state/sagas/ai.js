import { takeEvery, put } from 'redux-saga/effects'
import store from '../store'
import computeAiActions from '../../lib/ai/computeAiActions'

function* playAi() {
  const { currentFaction } = store.getState()

  if (currentFaction.type === 'COMPUTER') {
    
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

    console.log('_____END_AI_____')
    yield put({ type: 'END_AI_COMPUTATION' })

  } 
}

function* aiSaga() {
  yield takeEvery('BEGIN_PLAYER_TURN', playAi)
}

export default aiSaga
