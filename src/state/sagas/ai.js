import { take, takeLatest, select, put, delay } from 'redux-saga/effects'
import store from '../store'
import AiWebWorker from '../../lib/game/ai.worker'
import { findById } from '../../lib/common/utils'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from '../../lib/common/world/boundViewBox'

let worker

function* spanAiWebWorker(isNextTurn) {
  const state = yield select()

  // Cancel previous computations
  if (worker) {
    worker.terminate()
  }

  yield put({ type: 'RESET_AI_ACTIONS' })

  worker = new AiWebWorker()

  worker.postMessage({ state, isNextTurn })

  worker.onmessage = e => {
    store.dispatch({
      type: 'SET_AI_ACTIONS',
      payload: e.data,
    })
  }
}

function* prepareNextTurnAiActions() {
  const { currentFaction, factions } = yield select()

  let factionIndex = factions.findIndex(faction => faction.id === currentFaction.id)

  while (true) {
    factionIndex++

    if (factionIndex >= factions.length) {
      factionIndex = 0
    }

    if (factions[factionIndex].alive) break
  }

  const nextFaction = factions[factionIndex]

  if (nextFaction.type === 'COMPUTER') {
    yield spanAiWebWorker(true)
  }
}

function* prepareFirstTurnAiActions() {
  const { currentFaction, aiActions } = yield select()

  if (currentFaction.type === 'COMPUTER' && aiActions.length === 0) {
    yield spanAiWebWorker(false)
  }
}

function* flushAiActions() {
  const { currentFaction, units, booleans: { preventAutoZoom, delayComputerActions } } = yield select()

  if (currentFaction.type !== 'COMPUTER') return

  let aiActions = yield select(s => s.aiActions)

  if (aiActions.length === 0) {
    yield take('SET_AI_ACTIONS')

    aiActions = yield select(s => s.aiActions)
  }

  let previousActionUnitId

  for (let i = 0; i < aiActions.length; i++) {
    const action = aiActions[i]
    const { type, payload } = action
    const unitId = payload.attackerId || payload.unitId || null

    const gameOver = yield select(s => s.gameOver)

    if (gameOver) return

    if (previousActionUnitId !== unitId) {
      // Next action should move the viewBox

      if (i !== 0 && delayComputerActions) {
        yield delay(1000)
      }

      if (!preventAutoZoom) {
        let position1
        let position2

        switch (type) {
          case 'MOVE_UNIT':
            position1 = findById(units, unitId).position
            position2 = payload.position
            break

          case 'FIRE':
            position1 = findById(units, unitId).position
            position2 = findById(units, payload.defenderId).position
            break

          case 'CREATE_UNIT':
            position1 = position2 = payload.position
            break

          case 'CAPTURE':
          case 'PLAY_UNIT':
          default:
            position1 = position2 = findById(units, unitId).position
            break
        }

        if (position1 && position2) {
          const { viewBox } = yield select()

          const margin = 3
          const diffX = Math.abs(position2.x - position1.x)
          const diffY = Math.abs(position2.y - position1.y)
          const width1 = diffX + 2 * margin
          const width2 = Math.ceil((diffY + 2 * margin) * window.canvas.width / window.canvas.height)

          const goalWidth = boundViewBoxWidth(Math.max(width1, width2))
          const goalX = boundViewBoxX(Math.min(position1.x, position2.x) - margin, goalWidth)
          const goalY = boundViewBoxY(Math.min(position1.y, position2.y) - margin, goalWidth)

          yield put({
            type: 'RESIZE_VIEW_BOX',
            payload: {
              goalWidth,
              diffGoalWidth: goalWidth - viewBox.width,
              goalX,
              diffGoalX: goalX - viewBox.x,
              goalY,
              diffGoalY: goalY - viewBox.y,
            },
          })

          yield delay(5 * 17 * 5)
        }
      }
    }
    else {
      yield delay(100)
    }

    // console.log('putting action', action)
    yield put(action)

    if (action.type === 'MOVE_UNIT') {
      yield take('MOVE_UNIT_DONE')
    }

    previousActionUnitId = unitId
  }

  const { gameOver } = yield select()

  if (!gameOver) {
    yield delay(500)
    yield put({ type: 'RESET_VIEW_BOX' })
    yield put({ type: 'END_PLAYER_TURN' })
    yield put({ type: 'BEGIN_PLAYER_TURN' })
  }
}

function* aiSaga() {
  yield takeLatest('RESUME_GAME', prepareFirstTurnAiActions)
  yield takeLatest(['PLAY_UNIT', 'CREATE_UNIT', 'BEGIN_PLAYER_TURN'], prepareNextTurnAiActions)
  yield takeLatest(['BEGIN_PLAYER_TURN', 'RESUME_GAME'], flushAiActions)
}

export default aiSaga
