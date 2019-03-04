function canvasRegistrar(canvas, draw, eventsDescriptors = [], registerFn = () => null) {
  
  // A function called once for registering the canvas event listeners
  console.log('registering canvas')

  // For global canvas access
  window.canvas = canvas
    
  const _ = canvas.getContext('2d')
  const unregisterFn = registerFn(canvas)

  eventsDescriptors.forEach(([type, listener]) => {
    canvas.addEventListener(type, listener)
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
