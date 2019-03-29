import store from '../../../state/store'
import zoom from './zoom'

const eventHandlers = {
  mousemove: canvas => {
    let offsetX
    let offsetY

    return e => {
      const { mouse, viewBox } = store.getState()
      const tileSize = canvas.width / viewBox.width // pixel per tile

      offsetX = e.offsetX || offsetX
      offsetY = e.offsetY || offsetY

      const x = Math.floor((offsetX - viewBox.offsetX) / tileSize + viewBox.x)
      const y = Math.floor((offsetY - viewBox.offsetY) / tileSize + viewBox.y)

      if (mouse.x === x && mouse.y === y) return

      store.dispatch({
        type: 'UPDATE_MOUSE_POSITION',
        payload: {
          x,
          y,
        },
      })
    }
  },

  wheel: () => e => zoom(Math.sign(e.deltaY)),

  contextmenu: () => e => e.preventDefault(),
}

export default eventHandlers
