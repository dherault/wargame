import { takeEvery, select } from 'redux-saga/effects'
import gameConfiguration from '../../lib/gameConfiguration'
import store from '../store'
import { findById, samePosition, round } from '../../lib/common/utils'
import aStarSearch from '../../lib/common/aStarSearch'

function* moveUnit(action) {
  const { unitId, position, onCompletion } = action.payload
  const units = yield select(s => s.units)
  const unit = findById(units, unitId)
  const path = aStarSearch(store, unit, unit.previousPosition, position)
  const complete = () => {
    store.dispatch({
      type: 'MOVE_UNIT_DONE',
      payload: {
        unitId,
      },
    })

    if (typeof onCompletion === 'function') {
      onCompletion()
    }
  }

  if (path.length === 1) {
    return complete()
  }

  let offset = 0
  let currentPosition = path.shift()

  const interval = setInterval(() => {
    offset = round(offset + gameConfiguration.unitMovementIncrement, 2)

    const nextPosition = path[0]
    const unitPosition = {
      x: currentPosition.x + (nextPosition.x - currentPosition.x) * offset,
      y: currentPosition.y + (nextPosition.y - currentPosition.y) * offset,
    }

    store.dispatch({
      type: 'MOVE_UNIT_POSITION',
      payload: {
        unitId,
        position: unitPosition,
      },
    })

    if (samePosition(unitPosition, nextPosition)) {
      currentPosition = path.shift()
      offset = 0

      if (!path.length) {
        clearInterval(interval)
        complete()
      }
    }
  }, gameConfiguration.unitMovementPeriod)
}

function* moveUnitSaga() {
  yield takeEvery('MOVE_UNIT', moveUnit)
}

export default moveUnitSaga
