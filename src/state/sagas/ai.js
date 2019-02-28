import { takeEvery, put, delay, select } from 'redux-saga/effects'
import store from '../store'
import { findById } from '../../lib/common/utils'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from '../../lib/world/boundViewBox'
import computeAiActions from '../../lib/ai/computeAiActions'

// On every turn's beginning
// If the player is a computer
// Compute its move with the AI
function* playAi() {
  const { currentFaction, units } = store.getState()

  if (currentFaction.type !== 'COMPUTER') return 
    
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

  // if (actions.length === 0) throw new Error('no ai actions')

  console.log('_____END_AI_____')
  yield put({ type: 'END_AI_COMPUTATION' })

  let previousActionUnitId

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i]
    const { type, payload } = action
    const unitId = payload.attackerId || payload.unitId
    
    if (previousActionUnitId !== unitId) {
      // Next action should move the viewBox
      yield delay(1000)

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

        case 'CAPTURE':
        case 'PLAY_UNIT':
        default:
          position1 = position2 = findById(units, unitId).position
          break
      }

      if (position1 && position2) {
        const { viewBox } = yield select()

        const margin = 2
        const diffX = Math.abs(position2.x - position1.x)
        const diffY = Math.abs(position2.y - position1.y)
        const width1 = diffX + 2 * margin
        const width2 = Math.ceil((diffY + 2 * margin) * window.innerWidth / window.innerHeight)

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
    else {
      yield delay(100)
    }

    yield put(action)
    
    previousActionUnitId = unitId
  } 

  const { gameOver } = yield select()

  if (!gameOver) {
    setTimeout(() => {
      store.dispatch({ type: 'END_PLAYER_TURN' })
      store.dispatch({ type: 'BEGIN_PLAYER_TURN' })
    }, 500)
  }
}

function* aiSaga() {
  yield takeEvery('BEGIN_PLAYER_TURN', playAi)
}

export default aiSaga
