import hotkeys from 'piano-keys'
import store from '../../../state/store'
import gameConfiguration from '../../gameConfiguration'
import { boundViewBoxX, boundViewBoxY } from './boundViewBox'
import zoom from './zoom'

function registerWorldHotKeys(canvas) {
  const unregisterFunctions = []

  const registerHotKeys = (...args) => {
    unregisterFunctions.push(hotkeys(...args))
  }

  registerHotKeys(canvas, 'plus', () => zoom(-1))
  registerHotKeys(canvas, '-', () => zoom(1))

  const { viewBoxIntervalPeriod, viewBoxIncrements } = gameConfiguration
  const viewBoxDelay = viewBoxIncrements * viewBoxIntervalPeriod;

  ['z', 'up'].forEach(shortcut => {
    registerHotKeys(canvas, shortcut, () => {
      const { viewBox } = store.getState()
      const goalY = boundViewBoxY(Math.round(viewBox.goalY - 1))

      if (goalY === viewBox.goalY) return

      store.dispatch({
        type: 'RESIZE_VIEW_BOX',
        payload: {
          goalY,
          diffGoalY: goalY - viewBox.y,
        },
      })

      setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
    })
  });

  ['s', 'down'].forEach(shortcut => {
    registerHotKeys(canvas, shortcut, () => {
      const { viewBox } = store.getState()
      const goalY = boundViewBoxY(Math.round(viewBox.goalY + 1))

      if (goalY === viewBox.goalY) return

      store.dispatch({
        type: 'RESIZE_VIEW_BOX',
        payload: {
          goalY,
          diffGoalY: goalY - viewBox.y,
        },
      })

      setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
    })
  });

  ['q', 'left'].forEach(shortcut => {
    registerHotKeys(canvas, shortcut, () => {
      const { viewBox } = store.getState()
      const goalX = boundViewBoxX(Math.round(viewBox.goalX - 1))

      if (goalX === viewBox.goalX) return

      store.dispatch({
        type: 'RESIZE_VIEW_BOX',
        payload: {
          goalX,
          diffGoalX: goalX - viewBox.x,
        },
      })

      setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
    })
  });

  ['d', 'right'].forEach(shortcut => {
    registerHotKeys(canvas, shortcut, () => {
      const { viewBox } = store.getState()
      const goalX = boundViewBoxX(Math.round(viewBox.goalX + 1))

      if (goalX === viewBox.goalX) return

      store.dispatch({
        type: 'RESIZE_VIEW_BOX',
        payload: {
          goalX,
          diffGoalX: goalX - viewBox.x,
        },
      })

      setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
    })
  })

  // Return unregister function
  return () => {
    unregisterFunctions.forEach(fn => fn())
  }
}

export default registerWorldHotKeys
