import { takeEvery, put } from 'redux-saga/effects'
import store from '../store'
import { findById } from '../../lib/common/utils'

function* killUnit(action) {
  const { attackerId, defenderId } = action.payload
  const { units } = store.getState()

  const attacker = findById(units, attackerId)
  const defender = findById(units, defenderId)

  let deadUnitId

  if (attacker && attacker.life <= 0) deadUnitId = attackerId
  if (defender && defender.life <= 0) deadUnitId = defenderId

  if (deadUnitId) {
    yield put({
      type: 'KILL_UNIT',
      payload: {
        unitId: deadUnitId,
      },
    })
  }
}

function* aiSaga() {
  yield takeEvery('FIRE', killUnit)
}

export default aiSaga
