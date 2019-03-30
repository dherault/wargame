import { takeEvery, select, put, delay } from 'redux-saga/effects'

function* launchNewTurnAnimation() {
  const booleans = yield select(s => s.booleans)

  if (!booleans.disableNewTurnAnimation) {
    yield put({
      type: 'SET_BOOLEAN',
      payload: {
        isNewTurnAnimation: true,
      },
    })

    yield delay(1500)

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

function* turnSaga() {
  yield takeEvery('BEGIN_PLAYER_TURN', focusCanvas)
  yield takeEvery('BEGIN_PLAYER_TURN', launchNewTurnAnimation)
}

export default turnSaga
