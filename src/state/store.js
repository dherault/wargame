import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import throttle from 'lodash.throttle'

import { loadState, saveState } from './persist'

import worldMap from './reducers/worldMap'

import battleSaga from './sagas/battle'

const reducer = combineReducers({
  worldMap,
})

function* rootSaga() {
  yield all([
    battleSaga(),
  ])
}

function logger() {
  return next => action => {
    console.log('Action', action.type, action.payload)

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
