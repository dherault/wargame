import Mousetrap from 'mousetrap'
import store from '../state/store'
import gameConfiguration from './gameConfiguration'
import computeFireDamage from './units/computeFireDamage'
import computeMovementPositions from './units/computeMovementPositions'
import computeRangePositions from './units/computeRangePositions'
import { boundViewBoxX, boundViewBoxY, boundViewBoxWidth } from './world/boundViewBox'
import { samePosition, findById } from './utils'
import draw from './draw'

// A function called once for registering the canvas event listeners
function registerCanvas(canvas) {
  const _ = canvas.getContext('2d')

  /* -------------
    MOUSE EVENTS
  ------------- */

  /* Mouse move */

  let offsetX
  let offsetY

  canvas.addEventListener('mousemove', e => {
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

    
  })

  /* Click */

  function selectMousePosition() {
    const { mouse } = store.getState()

    store.dispatch({
      type: 'SELECT_POSITION',
      payload: {
        x: mouse.x,
        y: mouse.y,
      },
    })
  }

  function openUnitMenu() {
    selectMousePosition()

    store.dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isUnitMenuOpened: true,
      },
    })
  }

  canvas.addEventListener('mousedown', e => {
    const { currentFaction } = store.getState()
    // No click events on computer's turn
    if (currentFaction.type === 'COMPUTER') return

    // If left click
    if (e.button === 0) {
      console.log('left click')

      const { booleans, mouse, buildings, units, selectedUnitId, selectedPosition } = store.getState()
      const clickedUnit = units.find(unit => samePosition(unit.position, mouse))
      const clickedBuilding = buildings.find(building => samePosition(building.position, mouse))
      
      if (selectedUnitId) {
        
        const selectedUnit = findById(units, selectedUnitId)

        // If we are waiting for fire selection
        if (booleans.isFireSelection) {
          
          const rangePosition = computeRangePositions(store, selectedUnit)

          // If we clicked an ennemy unit in range
          if (clickedUnit && clickedUnit.team !== selectedUnit.team && rangePosition.some(position => samePosition(position, clickedUnit.position))) {
            
            store.dispatch({
              type: 'SET_BOOLEAN',
              payload: {
                isFireSelection: false,
              },
            })
  
            // Must be after isFireSelection: false
            store.dispatch({
              type: 'DESELECT_UNIT_ID',
            })

            store.dispatch({
              type: 'FIRE',
              payload: {
                attackerId: selectedUnitId,
                defenderId: clickedUnit.id,
                damages: computeFireDamage(store, selectedUnitId, clickedUnit.id),
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
          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isFireSelection: false,
            },
          })

          store.dispatch({
            type: 'MOVE_UNIT',
            payload: {
              unitId: selectedUnitId,
              position: selectedUnit.previousPosition,
            },
          })

          // Must be after isFireSelection: false
          store.dispatch({
            type: 'DESELECT_UNIT_ID',
          })

          return
        }

        // If we re-click on the unit we selected
        if (clickedUnit && clickedUnit.id === selectedUnitId) {
          return openUnitMenu()
        }

        const possibleMovementPositions = computeMovementPositions(store, selectedUnit)
        
        // If we click on a possible movement position
        if (possibleMovementPositions.some(position => samePosition(position, mouse))) {
          return openUnitMenu()
        }

        if (booleans.isUnitMenuOpened) {
          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isUnitMenuOpened: false,
            },
          })
        }

        if (booleans.isBuildingMenuOpened) {
          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isBuildingMenuOpened: false,
            },
          })
        }
      
        if (selectedPosition) {
          store.dispatch({ type: 'DESELECT_POSITION' })
        }

        if (booleans.isFireSelection) {
          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isFireSelection: false,
            },
          })
        }
        
        // Must be after CANCEL_FIRE_SELECTION
        store.dispatch({ type: 'DESELECT_UNIT_ID' })

        return
      }

      // If no unit is selected and we click a playable unit
      if (clickedUnit && clickedUnit.factionId === currentFaction.id && !clickedUnit.played) {
        
        store.dispatch({
          type: 'SELECT_UNIT_ID',
          payload: clickedUnit.id,
        })

        if (booleans.isBuildingMenuOpened) {
          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isBuildingMenuOpened: false,
            },
          })
        }

        if (selectedPosition) {
          store.dispatch({
            type: 'DESELECT_POSITION',
          })
        }
        
        return
      }

      // If we click on a creator building without a unit on it
      if (
        !clickedUnit
        && clickedBuilding 
        && clickedBuilding.factionId === currentFaction.id 
        && ['BASE', 'PORT', 'AIRPORT'].includes(clickedBuilding.type)
      ) {
        selectMousePosition()

        store.dispatch({
          type: 'SET_BOOLEAN',
          payload: {
            isBuildingMenuOpened: true,
          },
        })

        return
      }

      if (booleans.isBuildingMenuOpened) {
        store.dispatch({
          type: 'SET_BOOLEAN',
          payload: {
            isBuildingMenuOpened: false,
          },
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
        type: 'SET_BOOLEAN',
        payload: {
          isRightButtonDown: true,
        },
      })
    }
  })

  canvas.addEventListener('mouseup', e => {
    if (e.button === 2) {
      store.dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isRightButtonDown: false,
        },
      })
    }
  })

  canvas.addEventListener('contextmenu', e => e.preventDefault())

  /* Mouse wheel */

  function zoom(delta) {
    const { viewBox, mouse } = store.getState()
    const goalWidth = boundViewBoxWidth(viewBox.goalWidth + delta)

    if (goalWidth === viewBox.goalWidth) return

    const goalX = boundViewBoxX((mouse.x - goalWidth / viewBox.goalWidth * (mouse.x - viewBox.goalX)), goalWidth)
    const goalY = boundViewBoxY((mouse.y - goalWidth / viewBox.goalWidth * (mouse.y - viewBox.goalY)), goalWidth)

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
  }

  window.addEventListener('wheel', e => zoom(Math.sign(e.deltaY)))

  /* ----------------
    KEYBOARD EVENTS
  ---------------- */

  Mousetrap.bind('+', () => zoom(-1))
  Mousetrap.bind('-', () => zoom(1))

  const { viewBoxIntervalPeriod, viewBoxIncrements } = gameConfiguration
  const viewBoxDelay = viewBoxIncrements * viewBoxIntervalPeriod

  Mousetrap.bind(['z', 'up'], () => {
    const { viewBox } = store.getState()
    const goalY = boundViewBoxY(Math.round(viewBox.goalY - 1))

    if (goalY === viewBox.goalY) return

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalY,
        diffGoalY: goalY - viewBox.y,
      },
    })

    setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
  })

  Mousetrap.bind(['s', 'down'], () => {
    const { viewBox } = store.getState()
    const goalY = boundViewBoxY(Math.round(viewBox.goalY + 1))

    if (goalY === viewBox.goalY) return

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalY,
        diffGoalY: goalY - viewBox.y,
      },
    })

    setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
  })

  Mousetrap.bind(['q', 'left'], () => {
    const { viewBox } = store.getState()
    const goalX = boundViewBoxX(Math.round(viewBox.goalX - 1))

    if (goalX === viewBox.goalX) return

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalX,
        diffGoalX: goalX - viewBox.x,
      },
    })

    setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
  })

  Mousetrap.bind(['d', 'right'], () => {
    const { viewBox } = store.getState()
    const goalX = boundViewBoxX(Math.round(viewBox.goalX + 1))

    if (goalX === viewBox.goalX) return

    store.dispatch({ 
      type: 'RESIZE_VIEW_BOX', 
      payload: { 
        goalX,
        diffGoalX: goalX - viewBox.x,
      },
    })

    setTimeout(() => canvas.dispatchEvent(new Event('mousemove')), viewBoxDelay)
  })

  // Mousetrap.bind('z+q', () => {
  //   const { viewBox } = store.getState()
  //   const goalY = boundViewBoxY(Math.round(viewBox.goalY - 1))
  //   const goalX = boundViewBoxX(Math.round(viewBox.goalX - 1))

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
  //   const goalY = boundViewBoxY(Math.round(viewBox.goalY - 1))
  //   const goalX = boundViewBoxX(Math.round(viewBox.goalX + 1))

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
  //   const goalY = boundViewBoxY(Math.round(viewBox.goalY + 1))
  //   const goalX = boundViewBoxX(Math.round(viewBox.goalX - 1))

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
  //   const goalY = boundViewBoxY(Math.round(viewBox.goalY + 1))
  //   const goalX = boundViewBoxX(Math.round(viewBox.goalX + 1))

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
