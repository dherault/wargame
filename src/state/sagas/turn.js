import { takeEvery, take, put, delay, select } from 'redux-saga/effects'
import { findById } from '../../lib/common/utils'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from '../../lib/common/world/boundViewBox'
import computeAiActions from '../../lib/game/computeAiActions'

// On every turn's beginning
// If the player is a computer
// Compute its move with the AI
function* playAi() {
  const { currentFaction, units, booleans: { preventAutoZoom, delayComputerActions } } = yield select()

  if (currentFaction.type !== 'COMPUTER') return 
    
  yield put({
    type: 'SET_BOOLEAN',
    payload: {
      isAiComputing: true,
    },
  })

  // Delay so the state can propagate to the components
  yield delay(1)

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

  console.log('_____END_AI_____')

  yield put({
    type: 'SET_BOOLEAN',
    payload: {
      isAiComputing: false,
    },
  })

  let previousActionUnitId

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i]
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
            console.log('position1', position1)
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
      // console.log('waiting for unit to move')
      yield take('MOVE_UNIT_DONE')
      // console.log('unit moved')
    }
    
    previousActionUnitId = unitId
  } 

  const { gameOver } = yield select()

  if (!gameOver) {
    yield delay(500)

    yield put({ type: 'END_PLAYER_TURN' })
    yield put({ type: 'BEGIN_PLAYER_TURN' })
    yield put({ type: 'RESET_VIEW_BOX' })
  }
}

function focusCanvas() {
  if (window.canvas) {
    window.canvas.focus()
  }
}

function* aiSaga() {
  yield takeEvery('BEGIN_PLAYER_TURN', playAi)
  yield takeEvery('BEGIN_PLAYER_TURN', focusCanvas)
}

export default aiSaga
