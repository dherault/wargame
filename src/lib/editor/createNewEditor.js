import store from '../../state/store'

function createEmptyWorldMap(width = 20, height = 15) {
  const tiles = []
  const row = []

  for (let i = 0; i < width; i++) {
    row.push('PLAIN')
  }

  for (let j = 0; j < height; j++) {
    tiles.push(row)
  }

  return tiles
}

function createNewEditor() {
  console.log('Creating new editor')

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: createEmptyWorldMap(),
  })

  store.dispatch({
    type: 'SET_BUILDINGS',
    payload: [],
  })

  store.dispatch({
    type: 'SET_UNITS',
    payload: [],
  })

  store.dispatch({
    type: 'SET_FACTIONS',
    payload: [],
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
