import store from '../../state/store'
import draw from './draw'
import gameConfiguration from '../gameConfiguration'
import canvasRegistrar from '../common/canvasRegistrar'
import { samePosition, createId } from '../common/utils'
import registerWorldHotKeys from '../common/world/registerWorldHotKeys'
import eventHandlers from '../common/world/eventHandlers'

function updateWorldMapWithTerrain(terrainType) {
  const { worldMap, mouse } = store.getState()

  if (!(worldMap[mouse.y] && worldMap[mouse.y][mouse.x])) return

  const nextWorldMap = worldMap.slice()

  nextWorldMap[mouse.y] = nextWorldMap[mouse.y].slice()
  nextWorldMap[mouse.y][mouse.x] = terrainType

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: nextWorldMap,
  })
}

function updateFactions() {
  const { units, buildings } = store.getState()

  const factionIds = new Set()

  buildings.forEach(building => building.factionId && factionIds.add(building.factionId))
  units.forEach(unit => factionIds.add(unit.factionId))

  const nextFactions = []

  let i = 0

  factionIds.forEach(factionId => nextFactions.push({
    id: factionId,
    type: factionId === 'RED' ? 'HUMAN' : 'COMPUTER',
    team: ++i,
  }))

  store.dispatch({
    type: 'SET_FACTIONS',
    payload: nextFactions,
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
        if (e.button === 0) {
          console.log('left click')

          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isLeftButtonDown: true,
            },
          })

          const { mouse, booleans, buildings, units, worldMap, selectedTerrainType, selectedBuildingType, selectedUnitType, selectedFactionId } = store.getState()

          const tile = worldMap[mouse.y] && worldMap[mouse.y][mouse.x]

          if (!tile) return

          let existingBuildingIndex = buildings.findIndex(building => samePosition(building.position, mouse))

          if (selectedTerrainType) {
            updateWorldMapWithTerrain(selectedTerrainType)

            if (existingBuildingIndex !== -1) {
              const nextBuildings = buildings.slice()

              nextBuildings.splice(existingBuildingIndex, 1)

              store.dispatch({
                type: 'SET_BUILDINGS',
                payload: nextBuildings,
              })
            }
          }

          if (selectedBuildingType) {
            updateWorldMapWithTerrain(selectedBuildingType)

            if (existingBuildingIndex === -1) {
              existingBuildingIndex = buildings.length
            }

            const nextBuildings = buildings.slice()

            nextBuildings[existingBuildingIndex] = {
              type: selectedBuildingType,
              factionId: selectedFactionId,
              position: mouse,
            }

            store.dispatch({
              type: 'SET_BUILDINGS',
              payload: nextBuildings,
            })

            updateFactions()
          }

          if (selectedUnitType) {
            const movementCost = gameConfiguration.terrainConfiguration[tile].movementCost[gameConfiguration.unitsConfiguration[selectedUnitType].movementType]

            if (movementCost !== Infinity) {
              let existingUnitIndex = units.findIndex(unit => samePosition(unit.position, mouse))

              if (existingUnitIndex === -1) {
                existingUnitIndex = units.length
              }

              const nextUnits = units.slice()

              nextUnits[existingUnitIndex] = {
                id: createId(),
                type: selectedUnitType,
                factionId: selectedFactionId,
                position: mouse,
                life: 100,
              }

              store.dispatch({
                type: 'SET_UNITS',
                payload: nextUnits,
              })

              updateFactions()
            }
          }

          if (booleans.isDeletingUnits) {
            const unit = units.find(unit => samePosition(unit.position, mouse))

            if (unit) {
              store.dispatch({
                type: 'DELETE_UNIT',
                payload: {
                  unitId: unit.id,
                },
              })
            }
          }

          if (booleans.isFlippingUnits) {
            const unit = units.find(unit => samePosition(unit.position, mouse))

            if (unit) {
              store.dispatch({
                type: 'FLIP_UNIT',
                payload: {
                  unitId: unit.id,
                },
              })
            }
          }
        }
        else if (e.button === 2) {
          console.log('right click')

          const { booleans, selectedTerrainType, selectedBuildingType, selectedUnitType } = store.getState()

          if (selectedTerrainType) {
            store.dispatch({
              type: 'DESELECT_TERRAIN_TYPE',
            })
          }

          if (selectedBuildingType) {
            store.dispatch({
              type: 'DESELECT_BUILDING_TYPE',
            })
          }

          if (selectedUnitType) {
            store.dispatch({
              type: 'DESELECT_UNIT_TYPE',
            })
          }

          if (booleans.isDeletingUnits) {
            store.dispatch({
              type: 'SET_BOOLEAN',
              payload: {
                isDeletingUnits: false,
              },
            })
          }
        }
      }],

      ['mouseup', e => {
        if (e.button === 0) {
          store.dispatch({
            type: 'SET_BOOLEAN',
            payload: {
              isLeftButtonDown: false,
            },
          })
        }
      }],

      /* Mouse move */

      ['mousemove', eventHandlers.mousemove(canvas)],

      ['mousemove', () => {
        const { booleans, mouse, selectedTerrainType, worldMap } = store.getState()

        if (
          booleans.isLeftButtonDown
          && selectedTerrainType
          && worldMap[mouse.y]
          && worldMap[mouse.y][mouse.x] !== selectedTerrainType
        ) {
          updateWorldMapWithTerrain(selectedTerrainType)
        }
      }],

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
