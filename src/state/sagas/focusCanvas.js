import { takeEvery } from 'redux-saga/effects'

function focusCanvas() {
  if (window.canvas) {
    window.canvas.focus()
  }
}

function* focusCanvasSaga() {
  yield takeEvery('BEGIN_PLAYER_TURN', focusCanvas)
}

export default focusCanvasSaga
