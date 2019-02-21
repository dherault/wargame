import { createStore } from 'redux'

import createReducer from './createReducer'

import buildings from './reducers/buildings'
import currentFaction from './reducers/currentFaction'
import factions from './reducers/factions'
import moneyByFaction from './reducers/moneyByFaction'
import units from './reducers/units'
import worldMap from './reducers/worldMap'

const reducers = {
  buildings,
  currentFaction,
  factions,
  moneyByFaction,
  units,
  worldMap,
}

const createAiStore = initialState => createStore(createReducer(reducers), initialState)

export default createAiStore
