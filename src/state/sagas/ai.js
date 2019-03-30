import { take, takeLatest, select, put, delay, fork } from 'redux-saga/effects'
import store from '../store'
import AiWebWorker from '../../lib/game/ai.worker'
import { findById } from '../../lib/common/utils'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from '../../lib/common/world/boundViewBox'

let worker

function* spanAiWebWorker(isNextTurn) {
  // Stop if not playing
  const pathname = yield select(s => s.router.location.pathname)

  if (pathname !== '/game') return

  // Cancel previous computations
  if (worker) {
    worker.terminate()
  }

  yield put({ type: 'RESET_AI_ACTIONS' })

  const state = yield select()

  worker = new AiWebWorker()

  worker.postMessage({ state, isNextTurn })

  worker.onmessage = e => {
    store.dispatch({
      type: 'SET_AI_ACTIONS',
      payload: e.data,
    })

    worker = null
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

function* prepareCurrentTurnAiActions() {
  const { currentFaction, aiActions } = yield select()

  if (currentFaction.type === 'COMPUTER' && aiActions.length === 0) {
    yield spanAiWebWorker(false)
  }
}

function* flushAiActions() {
  const { currentFaction, units, booleans: { disableAutoZoom, disableDelayOnComputerActions } } = yield select()

  // Stop if not playing
  let pathname = yield select(s => s.router.location.pathname)

  if (pathname !== '/game') return

  // Flush only if currentFaction is a COMPUTER type
  if (currentFaction.type !== 'COMPUTER') return

  yield delay(1) // BAD !!!! To wait for turn saga to set isNewTurnAnimation = true

  const isNewTurnAnimation = yield select(s => s.booleans.isNewTurnAnimation)

  // If isNewTurnAnimation wait for the animation to finish
  if (isNewTurnAnimation) {
    yield take(action => action.type === 'SET_BOOLEAN' && action.payload.isNewTurnAnimation === false)
  }

  // Wait for aiActions
  let aiActions = yield select(s => s.aiActions)

  if (aiActions.length === 0) {
    if (!worker) {
      yield fork(prepareCurrentTurnAiActions)
    }

    yield take('SET_AI_ACTIONS')

    aiActions = yield select(s => s.aiActions)
  }

  let previousActionUnitId

  for (let i = 0; i < aiActions.length; i++) {
    // Stop if not playing
    pathname = yield select(s => s.router.location.pathname)

    if (pathname !== '/game') return

    const action = aiActions[i]
    const { type, payload } = action
    const unitId = payload.attackerId || payload.unitId || null

    const gameOver = yield select(s => s.gameOver)

    if (gameOver) return

    if (previousActionUnitId !== unitId) {
      // Next action should move the viewBox

      if (i !== 0 && !disableDelayOnComputerActions) {
        yield delay(1000)
      }

      if (!disableAutoZoom) {
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

  yield put({
    type: 'RESET_AI_ACTIONS',
  })

  const { gameOver } = yield select()

  if (!gameOver) {
    yield delay(500)
    yield put({ type: 'RESET_VIEW_BOX' })
    yield put({ type: 'END_PLAYER_TURN' })
    yield put({ type: 'BEGIN_PLAYER_TURN' })
  }
}

function* aiSaga() {
  yield takeLatest('RESUME_GAME', prepareCurrentTurnAiActions)
  yield takeLatest(['PLAY_UNIT', 'CREATE_UNIT'], prepareNextTurnAiActions)
  yield takeLatest(['BEGIN_PLAYER_TURN', 'RESUME_GAME'], flushAiActions)
}

export default aiSaga
