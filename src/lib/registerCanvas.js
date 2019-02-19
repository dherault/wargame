import Mousetrap from 'mousetrap'
import store from '../state/store'
import computeMovementTiles from './units/computeMovementTiles'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from './world/boundViewBox'
import draw from './draw'

function registerCanvas(canvas) {
  // A function called once for registering the canvas event listeners
  const _ = canvas.getContext('2d')

  /* -------------
    MOUSE EVENTS
  ------------- */

  /* Mouse move */

  canvas.addEventListener('mousemove', e => {
    const { viewBox } = store.getState()
    const tileSize = canvas.width / viewBox.width // pixel per tile

    store.dispatch({
      type: 'UPDATE_MOUSE_POSITION',
      payload: {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        x: Math.floor(e.offsetX / tileSize + viewBox.x),
        y: Math.floor(e.offsetY / tileSize + viewBox.y),
      }
    })
    // console.log(Math.floor(viewBox.x + e.offsetX / tileSize))
  })

  /* Left click */

  function openUnitMenu() {
    const { mouse, viewBox } = store.getState()
    const tileSize = canvas.width / viewBox.width // pixel per tile

    store.dispatch({
      type: 'SELECT_TILE',
      payload: {
        x: mouse.x,
        y: mouse.y,
      }
    })
    
    store.dispatch({
      type: 'OPEN_UNIT_MENU',
      payload: {
        offsetX: (mouse.x - viewBox.x + 1) * tileSize,
        offsetY: (mouse.y - viewBox.y) * tileSize
      },
    })
  }

  canvas.addEventListener('click', e => {
    const { mouse, units, selectedUnits, turn } = store.getState()

    // No click events on computer's turn
    if (turn.playerType === 'COMPUTER') return

    const clickedUnit = units.find(unit => unit.position.x === mouse.x && unit.position.y === mouse.y)

    if (clickedUnit && clickedUnit.faction === turn.faction && !clickedUnit.played) {
      
      if (selectedUnits[0] && clickedUnit.id === selectedUnits[0].id) {
        openUnitMenu()
      }
      else {
        store.dispatch({
          type: 'SELECT_UNIT_0',
          payload: clickedUnit,
        })
      }
      
      return
    }

    if (selectedUnits[0]) {
      const possibleMovementTiles = computeMovementTiles(selectedUnits[0])
     
      if (possibleMovementTiles.some(tile => tile.x === mouse.x && tile.y === mouse.y)) {
        return openUnitMenu()
      }

      store.dispatch({
        type: 'DESELECT_UNITS'
      })

      store.dispatch({
        type: 'CLOSE_UNIT_MENU'
      })

      return
    }
  })

  /* Right click */

  canvas.addEventListener('contextmenu', e => e.preventDefault())

  canvas.addEventListener('mousedown', e => {
    if (e.button === 2) {
      store.dispatch({
        type: 'DESELECT_UNITS'
      })

      store.dispatch({
        type: 'UPDATE_MOUSE_STATE',
        payload: {
          rightButtonDown: true,
        }
      })
    }
  })

  canvas.addEventListener('mouseup', e => {
    if (e.button === 2) {
      store.dispatch({
        type: 'UPDATE_MOUSE_STATE',
        payload: {
          rightButtonDown: false,
        }
      })
    }
  })

  /* Mouse wheel */

  window.addEventListener('wheel', e => {
    const { viewBox } = store.getState()
    const goalWidth = boundViewBoxWidth(viewBox.goalWidth + Math.sign(e.deltaY))

    if (goalWidth === viewBox.goalWidth) return

    const goalX = boundViewBoxX(viewBox.goalX, goalWidth)
    const goalY = boundViewBoxY(viewBox.goalY, goalWidth)

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
  })

  /* ----------------
    KEYBOARD EVENTS
  ---------------- */

  Mousetrap.bind('z', () => {
    const { viewBox } = store.getState()
    const goalY = boundViewBoxY(viewBox.goalY - 1)

    if (goalY === viewBox.goalY) return

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
    const goalY = boundViewBoxY(viewBox.goalY + 1)

    if (goalY === viewBox.goalY) return

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
    const goalX = boundViewBoxX(viewBox.goalX - 1)

    if (goalX === viewBox.goalX) return

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
    const goalX = boundViewBoxX(viewBox.goalX + 1)

    if (goalX === viewBox.goalX) return

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalX,
        diffGoalX: goalX - viewBox.x,
      },
    })
  })

  // Mousetrap.bind('z+q', () => {
  //   const { viewBox } = store.getState()
  //   const goalY = boundViewBoxY(viewBox.goalY - 1)
  //   const goalX = boundViewBoxX(viewBox.goalX - 1)

  //   if (goalY === viewBox.goalY && goalX === viewBox.goalX) return

  //   store.dispatch({ 
  //     type: 'RESIZE_VIEW_BOX', 
  //     payload: { 
  //       goalX,
  //       goalY,
  //       diffGoalX: goalX - viewBox.x,
  //       diffGoalY: goalY - viewBox.y,
  //     },
  //   })
  // })

  // Mousetrap.bind('z+d', () => {
  //   const { viewBox } = store.getState()
  //   const goalY = boundViewBoxY(viewBox.goalY - 1)
  //   const goalX = boundViewBoxX(viewBox.goalX + 1)

  //   if (goalY === viewBox.goalY && goalX === viewBox.goalX) return

  //   store.dispatch({ 
  //     type: 'RESIZE_VIEW_BOX', 
  //     payload: { 
  //       goalX,
  //       goalY,
  //       diffGoalX: goalX - viewBox.x,
  //       diffGoalY: goalY - viewBox.y,
  //     },
  //   })
  // })

  // Mousetrap.bind('s+q', () => {
  //   const { viewBox } = store.getState()
  //   const goalY = boundViewBoxY(viewBox.goalY + 1)
  //   const goalX = boundViewBoxX(viewBox.goalX - 1)

  //   if (goalY === viewBox.goalY && goalX === viewBox.goalX) return

  //   store.dispatch({ 
  //     type: 'RESIZE_VIEW_BOX', 
  //     payload: { 
  //       goalX,
  //       goalY,
  //       diffGoalX: goalX - viewBox.x,
  //       diffGoalY: goalY - viewBox.y,
  //     },
  //   })
  // })

  // Mousetrap.bind('s+d', () => {
  //   const { viewBox } = store.getState()
  //   const goalY = boundViewBoxY(viewBox.goalY + 1)
  //   const goalX = boundViewBoxX(viewBox.goalX + 1)

  //   if (goalY === viewBox.goalY && goalX === viewBox.goalX) return

  //   store.dispatch({ 
  //     type: 'RESIZE_VIEW_BOX', 
  //     payload: { 
  //       goalX,
  //       goalY,
  //       diffGoalX: goalX - viewBox.x,
  //       diffGoalY: goalY - viewBox.y,
  //     },
  //   })
  // })
  
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
