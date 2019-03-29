import { takeEvery } from 'redux-saga/effects'
import store from '../store'
import gameConfiguration from '../../lib/gameConfiguration'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from '../../lib/common/world/boundViewBox'

let interval
const { viewBoxIntervalPeriod, viewBoxIncrements } = gameConfiguration

// If the viewBox has changed, move it and/or zoom smoothly, increments by increments
// By firing actions that moves it a bit
function resizeViewBox() {
  clearInterval(interval)

  interval = setInterval(() => {
    const { width, goalWidth, diffGoalWidth, x, goalX, diffGoalX, y, goalY, diffGoalY } = store.getState().viewBox

    // The width is the viewBox's width, ie the number of tiles across the screen, ie the zoom
    const widthIncrement = diffGoalWidth / viewBoxIncrements
    let nextWidth = goalWidth - width ? width + widthIncrement : width
    const widthReached = Math.abs(goalWidth - nextWidth) < 0.01 // TODO: refactor

    if (widthReached) {
      nextWidth = goalWidth
    }

    const xIncrement = diffGoalX / viewBoxIncrements
    let nextX = goalX - x ? x + xIncrement : x
    const xReached = Math.abs(goalX - nextX) < 0.01

    if (xReached) {
      nextX = goalX
    }

    const yIncrement = diffGoalY / viewBoxIncrements
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
        width: boundViewBoxWidth(nextWidth), // TODO remove bounding if bug still happens
        x: boundViewBoxX(nextX, nextWidth),
        y: boundViewBoxY(nextY, nextWidth),
      },
    })
  }, viewBoxIntervalPeriod)
}

function* viewBoxSaga() {
  yield takeEvery('RESIZE_VIEW_BOX', resizeViewBox)
}

export default viewBoxSaga
