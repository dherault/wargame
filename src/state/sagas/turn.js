import { takeEvery, select, put, delay } from 'redux-saga/effects'
import gameConfiguration from '../../lib/gameConfiguration'

function* launchNewTurnAnimation() {
  const { booleans, gameOver } = yield select()

  if (gameOver) return

  if (!booleans.disableNewTurnAnimation) {
    yield put({
      type: 'SET_BOOLEAN',
      payload: {
        isNewTurnAnimation: true,
      },
    })

    yield delay(gameConfiguration.newTurnAnimationDuration)

    yield put({
      type: 'SET_BOOLEAN',
      payload: {
        isNewTurnAnimation: false,
      },
    })
  }
}

function focusCanvas() {
  if (window.canvas) {
    window.canvas.focus()
  }
}

// On resume, if the reload was during isNewTurnAnimation, resume with isNewTurnAnimation
function* endNewTurnAnimation() {
  const isNewTurnAnimation = yield select(s => s.booleans.isNewTurnAnimation)

  if (isNewTurnAnimation) {
    yield delay(gameConfiguration.newTurnAnimationDuration)

    yield put({
      type: 'SET_BOOLEAN',
      payload: {
        isNewTurnAnimation: false,
      },
    })
  }
}

function* turnSaga() {
  yield takeEvery('BEGIN_PLAYER_TURN', focusCanvas)
  yield takeEvery('BEGIN_PLAYER_TURN', launchNewTurnAnimation)
  yield takeEvery('RESUME_GAME', endNewTurnAnimation)
}

export default turnSaga
