import { takeLatest, select, put } from 'redux-saga/effects'
import store from '../store'

let worker

function* spanAiWebWorker() {
  const state = yield select()
  const { currentFaction, factions } = state

  let factionIndex = factions.findIndex(faction => faction.id === currentFaction.id)
    
  while (true) {
    factionIndex++
    
    if (factionIndex >= factions.length) {
      factionIndex = 0
    }

    if (factions[factionIndex].alive) break
  }

  const nextFaction = factions[factionIndex]

  if (nextFaction.type !== 'COMPUTER') return

  // Cancel previous computations
  if (worker) {
    worker.terminate()
  }

  yield put({ type: 'RESET_AI_ACTIONS' })

  worker = new Worker('aiWebWorker.js')

  worker.postMessage(state)

  worker.onmessage = e => {
    store.dispatch({
      type: 'SET_AI_ACTIONS',
      payload: e.data,
    })
  }
}

function* aiSaga() {
  yield takeLatest(action => action.type === 'PLAY_UNIT' || action.type === 'CREATE_UNIT', spanAiWebWorker)
}

export default aiSaga
