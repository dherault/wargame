import { takeEvery, put, select } from 'redux-saga/effects'
import { findById } from '../../lib/common/utils'

function* killUnit(action) {
  const { attackerId, defenderId } = action.payload
  const units = yield select(s => s.units)

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

function* killUnitSaga() {
  yield takeEvery('FIRE', killUnit)
}

export default killUnitSaga
