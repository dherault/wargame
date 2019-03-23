// import store from '../../state/store'
import draw from './draw'
// import gameConfiguration from '../gameConfiguration'
import canvasRegistrar from '../common/canvasRegistrar'
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

      ['mousedown', e => {
        if (e.button === 0) {
          console.log('left click')
        }
      }],

      // ['mouseup', e => {
      //   if (e.button === 0) {
      //     store.dispatch({
      //       type: 'SET_BOOLEAN',
      //       payload: {
      //         isLeftButtonDown: false,
      //       },
      //     })
      //   }
      // }],

      /* Mouse move */

      // ['mousemove', eventHandlers.mousemove(canvas)],

      /* -------------
        CONTEXT MENU
      ------------- */

      ['contextmenu', eventHandlers.contextmenu(canvas)],
    ] 
  )
}

export default registerCanvas
