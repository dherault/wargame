import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from './boundViewBox'
import store from '../../../state/store'

function zoom(delta) {
  const { viewBox, mouse } = store.getState()
  const goalWidth = boundViewBoxWidth(viewBox.goalWidth + delta)

  if (goalWidth === viewBox.goalWidth) return

  const goalX = boundViewBoxX((mouse.x - goalWidth / viewBox.goalWidth * (mouse.x - viewBox.goalX)), goalWidth)
  const goalY = boundViewBoxY((mouse.y - goalWidth / viewBox.goalWidth * (mouse.y - viewBox.goalY)), goalWidth)

  store.dispatch({
    type: 'RESIZE_VIEW_BOX',
    payload: {
      goalWidth,
      goalX,
      goalY,
      diffGoalWidth: goalWidth - viewBox.width,
      diffGoalX: goalX - viewBox.x,
      diffGoalY: goalY - viewBox.y,
    },
  })
}

export default zoom
