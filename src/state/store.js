import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import throttle from 'lodash.throttle'

import { loadState, saveState } from './persist'

import mouse from './reducers/mouse'
import playOrder from './reducers/playOrder'
import selectedTile from './reducers/selectedTile'
import selectedUnits from './reducers/selectedUnits'
import turn from './reducers/turn'
import unitMenu from './reducers/unitMenu'
import units from './reducers/units'
import viewBox from './reducers/viewBox'
import worldMap from './reducers/worldMap'

import viewBoxSaga from './sagas/viewBox'

const reducer = combineReducers({
  mouse,
  playOrder,
  selectedTile,
  selectedUnits,
  turn,
  unitMenu,
  units,
  viewBox,
  worldMap,
})

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
