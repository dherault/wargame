import Mousetrap from 'mousetrap'
import store from '../state/store'
import computeFireDamage from './units/computeFireDamage'
import computeMovementPositions from './units/computeMovementPositions'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from './world/boundViewBox'
import { samePosition, findById } from './utils'
import draw from './draw'
import computeRangePositions from './units/computeRangePositions';

// A function called once for registering the canvas event listeners
function registerCanvas(canvas) {
  const _ = canvas.getContext('2d')

  /* -------------
    MOUSE EVENTS
  ------------- */

  /* Mouse move */

  canvas.addEventListener('mousemove', e => {
    const { mouse, viewBox } = store.getState()
    const tileSize = canvas.width / viewBox.width // pixel per tile

    const x = Math.floor(e.offsetX / tileSize + viewBox.x)
    const y = Math.floor(e.offsetY / tileSize + viewBox.y)

    if (mouse.x === x && mouse.y === y) return

    store.dispatch({
      type: 'UPDATE_MOUSE_POSITION',
      payload: {
        x,
        y,
      }
    })
  })

  /* Click */

  function selectMousePosition() {
    const { mouse } = store.getState()

    store.dispatch({
      type: 'SELECT_POSITION',
      payload: {
        x: mouse.x,
        y: mouse.y,
      }
    })
  }

  function openUnitMenu() {
    selectMousePosition()

    store.dispatch({
      type: 'OPEN_UNIT_MENU',
    })
  }

  canvas.addEventListener('mousedown', e => {
    // No click events on computer's turn
    if (store.getState().turn.playerType === 'COMPUTER') return

    // If left click
    if (e.button === 0) {
      console.log('left click')

      const { mouse, buildings, units, selectedUnitId, buildingMenu, unitMenu, selectedPosition, turn } = store.getState()
      const clickedUnit = units.find(unit => samePosition(unit.position, mouse))
      const clickedBuilding = buildings.find(building => samePosition(building.position, mouse))
      
      if (selectedUnitId) {
        
        const selectedUnit = findById(units, selectedUnitId)

        // If we are waiting for fire selection
        if (unitMenu.awaitFireSelection) {
          
          const rangePosition = computeRangePositions(selectedUnit)

          // If we clicked an ennemy unit in range
          if (clickedUnit && clickedUnit.team !== selectedUnit.team && rangePosition.some(position => samePosition(position, clickedUnit.position))) {
            
            store.dispatch({
              type: 'CANCEL_FIRE_SELECTION'
            })
  
            // Must be after CANCEL_FIRE_SELECTION
            store.dispatch({
              type: 'DESELECT_UNIT_ID',
            })

            store.dispatch({
              type: 'FIRE',
              payload: {
                attackerId: selectedUnitId,
                defenderId: clickedUnit.id,
                damages: computeFireDamage(selectedUnitId, clickedUnit.id)
              },
            })

            store.dispatch({
              type: 'PLAY_UNIT',
              payload: {
                unitId: selectedUnitId,
              },
            })
  
            return
          }
  
          // If we did not click an ennemy in range
          else {
            store.dispatch({
              type: 'CANCEL_FIRE_SELECTION'
            })

            store.dispatch({
              type: 'MOVE_UNIT',
              payload: {
                unitId: selectedUnitId,
                position: selectedUnit.previousPosition,
              },
            })

            store.dispatch({
              type: 'DESELECT_UNIT_ID',
            })

            return
          }
        }

        // If we re-click on the unit we selected
        if (clickedUnit && clickedUnit.id === selectedUnitId) {
          return openUnitMenu()
        }

        const possibleMovementPositions = computeMovementPositions(selectedUnit)
        
        // If we click on a possible movement position
        if (possibleMovementPositions.some(position => samePosition(position, mouse))) {
          return openUnitMenu()
        }

        if (unitMenu.opened) {
          store.dispatch({ type: 'CLOSE_UNIT_MENU' })
        }

        if (selectedPosition) {
          store.dispatch({ type: 'DESELECT_POSITION' })
        }

        if (unitMenu.awaitFireSelection) {
          store.dispatch({ type: 'CANCEL_FIRE_SELECTION' })
        }
        
        // Must be after CANCEL_FIRE_SELECTION
        store.dispatch({ type: 'DESELECT_UNIT_ID' })

        return
      }

      // If no unit is selected and we click a playable unit
      if (clickedUnit && clickedUnit.factionId === turn.faction.id && !clickedUnit.played) {
        
        store.dispatch({
          type: 'SELECT_UNIT_ID',
          payload: clickedUnit.id,
        })
        
        return
      }

      if (clickedBuilding && clickedBuilding.factionId === turn.faction.id && clickedBuilding.type !== 'CITY') {
        selectMousePosition()

        store.dispatch({
          type: 'OPEN_BUILDING_MENU',
        })

        return
      }

      if (buildingMenu.opened) {
        store.dispatch({ 
          type: 'CLOSE_BUILDING_MENU',
        })
      }

      if (selectedPosition) {
        store.dispatch({ 
          type: 'DESELECT_POSITION',
        })
      }
    }

    // If right click
    else if (e.button === 2) {
      console.log('right click')

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

  canvas.addEventListener('contextmenu', e => e.preventDefault())

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
