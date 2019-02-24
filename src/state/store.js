import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { loadState, saveState } from './persist'
import createReducer from './createReducer'
import { createThrottle } from '../lib/utils'

import aiComputation from './reducers/aiComputation'
import buildingMenu from './reducers/buildingMenu'
import buildings from './reducers/buildings'
import currentFaction from './reducers/currentFaction'
import factions from './reducers/factions'
import moneyByFaction from './reducers/moneyByFaction'
import mouse from './reducers/mouse'
import selectedPosition from './reducers/selectedPosition'
import selectedUnitId from './reducers/selectedUnitId'
import turn from './reducers/turn'
import unitMenu from './reducers/unitMenu'
import units from './reducers/units'
import viewBox from './reducers/viewBox'
import worldMap from './reducers/worldMap'

import aiSaga from './sagas/ai'
import viewBoxSaga from './sagas/viewBox'

// Reducers must be placed in a certain order
// See createReducer
const reducers = {
  aiComputation, 
  buildingMenu, 
  buildings,
  factions,
  currentFaction, // must be after factions
  moneyByFaction,
  mouse,
  selectedPosition,
  selectedUnitId,
  turn,
  unitMenu,
  units, // must be after buildings
  viewBox,
  worldMap,
}

const reducer = createReducer(reducers)

function* rootSaga() {
  yield all([
    aiSaga(),
    viewBoxSaga(),
  ])
}

function logger() {
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

const middleware = process.env.NODE_ENV === 'production' ? applyMiddleware(sagaMiddleware) : applyMiddleware(sagaMiddleware, logger)
const enhancer = composeEnhancers(middleware)

// We load the store's initial state from localStorage
const persistedState = loadState()
// const persistedState = {}

const store = createStore(reducer, persistedState, enhancer)

sagaMiddleware.run(rootSaga)

// Save persisted state
const throttle = createThrottle()

store.subscribe(throttle(() => saveState(store.getState()), 1000))

// For debug purposes
window.store = store

export default store
