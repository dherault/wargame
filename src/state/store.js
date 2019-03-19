import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import history from '../history'
import createReducer from './createReducer'
import { loadState, saveState } from './persist'
import { throttle } from '../lib/common/utils'

import aiActions from './reducers/aiActions'
import booleans from './reducers/booleans'
import buildings from './reducers/buildings'
import currentFaction from './reducers/currentFaction'
import factions from './reducers/factions'
import gameOver from './reducers/gameOver'
import mapDefinitionDescription from './reducers/mapDefinitionDescription'
import mapDefinitionName from './reducers/mapDefinitionName'
import moneyByFaction from './reducers/moneyByFaction'
import mouse from './reducers/mouse'
import selectedBuildingType from './reducers/selectedBuildingType'
import selectedFactionId from './reducers/selectedFactionId'
import selectedMenu from './reducers/selectedMenu'
import selectedPosition from './reducers/selectedPosition'
import selectedTerrainType from './reducers/selectedTerrainType'
import selectedUnitId from './reducers/selectedUnitId'
import selectedUnitType from './reducers/selectedUnitType'
import turn from './reducers/turn'
import units from './reducers/units'
import userMapDefinitions from './reducers/userMapDefinitions'
import viewBox from './reducers/viewBox'
import worldMap from './reducers/worldMap'

import aiSaga from './sagas/ai'
import focusCanvasSaga from './sagas/focusCanvas'
import killUnitSaga from './sagas/killUnit'
import moveUnitSaga from './sagas/moveUnit'
import viewBoxSaga from './sagas/viewBox'

// Reducers must be placed in a certain order
// See createReducer
const reducer = createReducer({
  aiActions,
  booleans, 
  buildings, // must be before units
  factions,
  currentFaction, // must be after factions
  mapDefinitionDescription,
  mapDefinitionName,
  moneyByFaction,
  mouse,
  selectedBuildingType,
  selectedFactionId,
  selectedMenu,
  selectedPosition,
  selectedTerrainType,
  selectedUnitId,
  selectedUnitType,
  turn,
  units, // must be after buildings and currentFaction
  gameOver, // must be after buildings and units and turn
  userMapDefinitions,
  viewBox,
  worldMap,
  router: connectRouter(history),
})

function* rootSaga() {
  yield all([
    aiSaga(),
    focusCanvasSaga(),
    killUnitSaga(),
    moveUnitSaga(),
    viewBoxSaga(),
  ])
}

function loggerMiddleware() {
  return next => action => {
    if (action.type !== 'UPDATE_MOUSE_POSITION') {
      console.log('Action', action.type, action.payload)
    }

    return next(action)
  }
}

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const middlewares = [routerMiddleware(history), sagaMiddleware]

if (process.env.NODE_ENV !== 'production') middlewares.push(loggerMiddleware)

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// We load the store's initial state from localStorage
const persistedState = loadState()
// const persistedState = {}

const store = createStore(reducer, persistedState, enhancer)

sagaMiddleware.run(rootSaga)

// Save persisted state
store.subscribe(throttle(() => saveState(store.getState()), 333))

// For debug purposes
window.store = store

export default store
