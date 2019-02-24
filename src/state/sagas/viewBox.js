import { takeEvery } from 'redux-saga/effects'
import store from '../store'

let interval
const intervalPeriod = 17 // 17ms period = 60 iterations per seconds frequency
const nIncrements = 5 // The viewBox will move nIncrements times each time it has changed

// If the viewBox has changed, move it and/or zoom smoothly, increments by increments
// By firing actions that moves it a bit
function resizeViewBox() {
  clearInterval(interval)
  
  interval = setInterval(() => {
    const { width, goalWidth, diffGoalWidth, x, goalX, diffGoalX, y, goalY, diffGoalY } = store.getState().viewBox

    // The width is the viewBox's width, ie the number of tiles across the screen, ie the zoom
    const widthIncrement = diffGoalWidth / nIncrements
    let nextWidth = goalWidth - width ? width + widthIncrement : width
    const widthReached = Math.abs(goalWidth - nextWidth) < 0.01 // TODO: refactor

    if (widthReached) {
      nextWidth = goalWidth
    }

    const xIncrement = diffGoalX / nIncrements
    let nextX = goalX - x ? x + xIncrement : x
    const xReached = Math.abs(goalX - nextX) < 0.01

    if (xReached) {
      nextX = goalX
    }

    const yIncrement = diffGoalY / nIncrements
    let nextY = goalY - y ? y + yIncrement : y
    const yReached = Math.abs(goalY - nextY) < 0.01

    if (yReached) {
      nextY = goalY
    }
    
    if (widthReached && xReached && yReached) {
      clearInterval(interval)
    }

    // UPDATE_VIEW_BOX will move the view box without re-firing resizeViewBox
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
