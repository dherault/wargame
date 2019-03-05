import store from '../../state/store'

function canvasRegistrar(canvas, draw, eventsDescriptors = [], registerFn = () => null) {
  
  // A function called once for registering the canvas event listeners
  console.log('registering canvas')

  // For global canvas access, do not remove
  window.canvas = canvas

  // Once the canvas is set up, we can reset the view box
  store.dispatch({ type: 'RESET_VIEW_BOX' })
    
  const _ = canvas.getContext('2d')
  const unregisterFn = registerFn(canvas)

  // We add the event listeners
  eventsDescriptors.forEach(([type, listener]) => {
    canvas.addEventListener(type, listener)
  })

  let requestId

  // Draw the canvas
  const drawStep = () => {
    draw(_)
    requestId = requestAnimationFrame(drawStep)
  }

  console.log('drawing canvas')
  
  requestId = requestAnimationFrame(drawStep)

  canvas.focus()

  // Return unregisterCanvas
  return () => {
    console.log('unregistering canvas')

    cancelAnimationFrame(requestId)

    unregisterFn(canvas)

    eventsDescriptors.forEach(([type, listener]) => {
      canvas.removeEventListener(type, listener)
    })
  }
}

export default canvasRegistrar
