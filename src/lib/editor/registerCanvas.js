// import store from '../../state/store'
import draw from '../common/world/draw'
import canvasRegistrar from '../canvasRegistrar'
// import { samePosition, findById } from '../common/utils'
import registerWorldHotKeys from '../common/world/registerWorldHotKeys'
import eventHandlers from '../common/world/eventHandlers'

function registerCanvas(canvas) {
  return canvasRegistrar(
    canvas,
    draw,
    [
      /* -------------
        MOUSE EVENTS
      ------------- */

      /* Click */

      // ['mousedown', e => {
      // }],

      // ['mouseup', e => {
      //   if (e.button === 2) {
      //     store.dispatch({
      //       type: 'SET_BOOLEAN',
      //       payload: {
      //         isRightButtonDown: false,
      //       },
      //     })
      //   }
      // }],

      /* Mouse move */

      ['mousemove', eventHandlers.mousemove(canvas)],

      /* Wheel */

      ['wheel', eventHandlers.wheel(canvas)],

      /* -------------
        CONTEXT MENU
      ------------- */

      ['contextmenu', eventHandlers.contextmenu(canvas)],
    ], 
    registerWorldHotKeys
  )
}

export default registerCanvas
