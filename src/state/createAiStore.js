import { createStore } from 'redux'

import createReducer from './createReducer'

import buildings from './reducers/buildings'
import currentFaction from './reducers/currentFaction'
import factions from './reducers/factions'
import gameOver from './reducers/gameOver'
import moneyByFaction from './reducers/moneyByFaction'
import units from './reducers/units'
import worldMap from './reducers/worldMap'

const reducers = {
  buildings,
  factions,
  currentFaction, // must be after factions
  moneyByFaction,
  units, // must be after buildings and currentFaction
  gameOver, // must be after buildings and units
  worldMap,
}

// A lightweight store of AI computations
const createAiStore = initialState => createStore(createReducer(reducers), initialState)

export default createAiStore
