import draw from './draw'
import canvasRegistrar from '../../common/canvasRegistrar'
import eventHandlers from '../../common/world/eventHandlers'

function registerCanvas(canvas) {
  return canvasRegistrar(
    canvas,
    draw,
    [
      /* -------------
        CONTEXT MENU
      ------------- */

      ['contextmenu', eventHandlers.contextmenu(canvas)],
    ],
  )
}

export default registerCanvas
