import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import throttle from 'lodash.throttle'

import { loadState, saveState } from './persist'

import buildingMenu from './reducers/buildingMenu'
import buildings from './reducers/buildings'
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

import viewBoxSaga from './sagas/viewBox'

const reducers = {
  buildingMenu, 
  buildings,
  factions,
  moneyByFaction,
  mouse,
  selectedPosition,
  selectedUnitId,
  turn,
  unitMenu,
  units,
  viewBox,
  worldMap,
}

const reducer = (state = {}, action) => {
  const nextState = {}

  // Adding two extra arguments to reducers:
  // - state previous to action
  // - ongoing modified state
  Object.keys(reducers).forEach(key => {
    nextState[key] = reducers[key](state[key], action, state, nextState)
  })

  return nextState
}

function* rootSaga() {
  yield all([
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

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger))
const persistedState = loadState()

const store = createStore(reducer, persistedState, enhancer)

sagaMiddleware.run(rootSaga)

// Save persisted state
store.subscribe(throttle(() => saveState(store.getState()), 1000))

// For debug purposes
window.store = store

export default store
