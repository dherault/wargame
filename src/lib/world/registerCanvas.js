import Mousetrap from 'mousetrap'
import store from '../../state/store'
import draw from './draw'

function registerCanvas(canvas) {
  // A function called once for registering the canvas event listeners
  const _ = canvas.getContext('2d')

  // For debug purposes
  // window.canvas = canvas
  // window._ = _

  // canvas.addEventListener('click', e => console.log(e))
  
  window.addEventListener('wheel', e => {
    const { viewBox } = store.getState()
    const goalWidth = viewBox.goalWidth + Math.sign(e.deltaY)

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalWidth,
        diffGoalWidth: goalWidth - viewBox.width,
      },
    })
  })

  Mousetrap.bind('z', () => {
    const { viewBox } = store.getState()
    const goalY = viewBox.goalY - 1

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalY,
        diffGoalY: goalY - viewBox.y,
      },
    })
  })

  Mousetrap.bind('s', () => {
    const { viewBox } = store.getState()
    const goalY = viewBox.goalY + 1

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalY,
        diffGoalY: goalY - viewBox.y,
      },
    })
  })

  Mousetrap.bind('q', () => {
    const { viewBox } = store.getState()
    const goalX = viewBox.goalX - 1

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalX,
        diffGoalX: goalX - viewBox.x,
      },
    })
  })

  Mousetrap.bind('d', () => {
    const { viewBox } = store.getState()
    const goalX = viewBox.goalX + 1

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalX,
        diffGoalX: goalX - viewBox.x,
      },
    })
  })
  
  let requestId

  // Cancel previous draw
  cancelAnimationFrame(requestId)

  // Draw the canvas
  const drawStep = () => {
    draw(_)
    requestId = requestAnimationFrame(drawStep)
  }

  console.log('drawing canvas')
  
  requestId = requestAnimationFrame(drawStep)

  // Return unregisterCanvas
  return () => cancelAnimationFrame(requestId)
}

export default registerCanvas
