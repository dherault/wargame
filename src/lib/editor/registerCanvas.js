import store from '../../state/store'
import draw from './draw'
import gameConfiguration from '../gameConfiguration'
import canvasRegistrar from '../common/canvasRegistrar'
import { samePosition } from '../common/utils'
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

  buildings.forEach(building => factionIds.add(building.factionId))
  units.forEach(unit => factionIds.add(unit.factionId))

  const nextFactions = []

  factionIds.forEach(factionId => nextFactions.push({ id: factionId }))

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

          const { mouse, buildings, units, worldMap, selectedTerrainType, selectedBuildingType, selectedUnitType, selectedFactionId } = store.getState()

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
                id: Math.random().toString().slice(2), // TODO: remove id
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
