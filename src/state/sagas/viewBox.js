import { takeEvery } from 'redux-saga/effects'
import store from '../store'

let interval
const intervalPeriod = 17

function resizeViewBox() {
  clearInterval(interval)
  
  interval = setInterval(() => {
    const { width, goalWidth, diffGoalWidth, x, goalX, diffGoalX, y, goalY, diffGoalY } = store.getState().viewBox

    const zoomIncrement = diffGoalWidth / 5
    let nextWidth = goalWidth - width ? width + zoomIncrement : width
    const zoomReached = Math.abs(goalWidth - nextWidth) < 0.01 // TODO: refactor

    if (zoomReached) {
      nextWidth = goalWidth
    }

    const xIncrement = diffGoalX / 5
    let nextX = goalX - x ? x + xIncrement : x
    const xReached = Math.abs(goalX - nextX) < 0.01

    if (xReached) {
      nextX = goalX
    }

    const yIncrement = diffGoalY / 5
    let nextY = goalY - y ? y + yIncrement : y
    const yReached = Math.abs(goalY - nextY) < 0.01

    if (yReached) {
      nextY = goalY
    }
    
    if (zoomReached && xReached && yReached) {
      clearInterval(interval)
    }

    store.dispatch({
      type: 'UPDATE_VIEW_BOX',
      payload: {
        width: nextWidth,
        x: nextX,
        y: nextY,
      },
    })
  }, intervalPeriod)
}

function* viewBoxSaga() {
  yield takeEvery('RESIZE_VIEW_BOX', resizeViewBox)
}

export default viewBoxSaga
