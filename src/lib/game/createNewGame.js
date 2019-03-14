import store from '../../state/store'

function createNewGame({ worldMap, buildings, units, factions, name, description }, isFogOfWar = false) {
  console.log('Creating new game')

  store.dispatch({
    type: 'SET_MAP_DEFINITION_NAME',
    payload: name,
  })

  store.dispatch({
    type: 'SET_MAP_DEFINITION_DESCRIPTION',
    payload: description,
  })

  store.dispatch({
    type: 'RESET_TURN',
  })

  const currentFaction = factions[0]

  const moneyByFaction = {}

  factions.forEach(faction => moneyByFaction[faction.id] = 0)

  store.dispatch({
    type: 'SET_WORLD_MAP',
    payload: worldMap,
  })

  store.dispatch({
    type: 'SET_BUILDINGS',
    payload: buildings,
  })

  store.dispatch({
    type: 'SET_UNITS',
    payload: units,
  })

  store.dispatch({
    type: 'SET_FACTIONS',
    payload: factions,
  })

  store.dispatch({
    type: 'SET_CURRENT_FACTION',
    payload: currentFaction,
  })

  store.dispatch({
    type: 'SET_MONEY_BY_FACTION',
    payload: moneyByFaction,
  })

  store.dispatch({ 
    type: 'BEGIN_PLAYER_TURN',
  })

  store.dispatch({
    type: 'DESELECT_UNIT',
  })

  store.dispatch({
    type: 'DESELECT_POSITION',
  })

  store.dispatch({
    type: 'RESET_BOOLEANS',
    payload: {
      isFogOfWar,
      isPlaying: true,
    },
  })
}

export default createNewGame
