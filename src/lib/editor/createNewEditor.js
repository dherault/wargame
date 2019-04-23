import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import { randomArray } from '../common/utils'

function createEmptyWorldMap(width = 20, height = 15) {
  const tiles = []
  const row = []

  for (let i = 0; i < width; i++) {
    row.push({ type: 'PLAIN', backgroundImageSource: randomArray(gameConfiguration.terrainConfiguration.PLAIN.tileBackgroundImageSources) })
  }

  for (let j = 0; j < height; j++) {
    tiles.push(row)
  }

  return tiles
}

function createNewEditor({ worldMap, buildings, units, factions, name, description } = {}) {
  console.log('Creating new editor')

  store.dispatch({
    type: 'SET_MAP_DEFINITION_NAME',
    payload: name || 'My map',
  })

  store.dispatch({
    type: 'SET_MAP_DEFINITION_DESCRIPTION',
    payload: description || '',
  })

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: worldMap || createEmptyWorldMap(),
  })

  store.dispatch({
    type: 'SET_BUILDINGS',
    payload: buildings || [],
  })

  store.dispatch({
    type: 'SET_UNITS',
    payload: units || [],
  })

  store.dispatch({
    type: 'SET_FACTIONS',
    payload: factions || [],
  })

  store.dispatch({
    type: 'SET_CURRENT_FACTION',
    payload: null,
  })

  store.dispatch({
    type: 'SET_MONEY_BY_FACTION',
    payload: {},
  })

  store.dispatch({
    type: 'DESELECT_UNIT',
  })

  store.dispatch({
    type: 'DESELECT_POSITION',
  })

  store.dispatch({
    type: 'DESELECT_TERRAIN',
  })

  store.dispatch({
    type: 'DESELECT_FACTION_ID',
  })

  store.dispatch({
    type: 'DESELECT_TERRAIN_TYPE',
  })

  store.dispatch({
    type: 'DESELECT_BUILDING_TYPE',
  })

  store.dispatch({
    type: 'DESELECT_UNIT_TYPE',
  })

  store.dispatch({
    type: 'RESET_BOOLEANS',
    payload: {
      isEditing: true,
    },
  })
}

export default createNewEditor
