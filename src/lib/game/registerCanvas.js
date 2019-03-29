import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import draw from './draw'
import canvasRegistrar from '../common/canvasRegistrar'
import computeFireDamage from './computeFireDamage'
import computeMovementPositions from './computeMovementPositions'
import computeRangePositions from './computeRangePositions'
import { samePosition, findById } from '../common/utils'
import registerWorldHotKeys from '../common/world/registerWorldHotKeys'
import eventHandlers from '../common/world/eventHandlers'

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

function cancelFireSelection() {
  const { units, selectedUnitId } = store.getState()
  const selectedUnit = findById(units, selectedUnitId)

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
}

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
        const { currentFaction } = store.getState()
        // No click events on computer's turn
        if (currentFaction.type === 'COMPUTER') return

        // If left click
        if (e.button === 0) {
          console.log('left click')

          const { booleans, mouse, buildings, units, selectedUnitId, selectedPosition } = store.getState()

          // No left click if a unit is moving
          if (units.some(unit => unit.isMoving)) return

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

                const damages = computeFireDamage(store, selectedUnitId, clickedUnit.id)

                store.dispatch({
                  type: 'FIRE',
                  payload: {
                    attackerId: selectedUnitId,
                    defenderId: clickedUnit.id,
                    damages,
                  },
                })

                if (selectedUnit.life > damages[1]) {
                  store.dispatch({
                    type: 'PLAY_UNIT',
                    payload: {
                      unitId: selectedUnitId,
                    },
                  })
                }

                return
              }

              // If we did not click an ennemy in range
              cancelFireSelection()

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
            && gameConfiguration.creationBuildingTypes.includes(clickedBuilding.type)
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
          const { booleans, selectedUnitId } = store.getState()

          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isRightButtonDown: true,
            },
          })

          if (selectedUnitId && booleans.isFireSelection) {
            cancelFireSelection()
          }
        }
      }],

      ['mouseup', e => {
        if (e.button === 2) {
          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isRightButtonDown: false,
            },
          })
        }
      }],

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
