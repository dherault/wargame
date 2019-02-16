// import store from '../../state/store'
import draw from './draw'

function registerCanvas(canvas) {
  // A function called once for registering the canvas event listeners
  const _ = canvas.getContext('2d')

  // For debug purposes
  // window.canvas = canvas
  // window._ = _

  canvas.addEventListener('click', e => console.log(e))

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
