import store from '../../state/store'
import draw from './draw'
import canvasRegistrar from '../canvasRegistrar'
// import { samePosition, findById } from '../common/utils'
import registerWorldHotKeys from '../common/world/registerWorldHotKeys'
import eventHandlers from '../common/world/eventHandlers'

function updateWorldMapWithSelectedTerrain() {
  const { worldMap, mouse, selectedTerrainType } = store.getState()

  if (!(worldMap[mouse.y] && worldMap[mouse.y][mouse.x])) return

  const nextWorldMap = worldMap.slice()

  nextWorldMap[mouse.y] = nextWorldMap[mouse.y].slice()
  nextWorldMap[mouse.y][mouse.x] = selectedTerrainType

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: nextWorldMap,
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

          const { selectedTerrainType } = store.getState()

          if (selectedTerrainType) {
            updateWorldMapWithSelectedTerrain()
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
          updateWorldMapWithSelectedTerrain()
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
