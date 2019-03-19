import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import createReducer from './createReducer'

import buildings from './reducers/buildings'
import currentFaction from './reducers/currentFaction'
import factions from './reducers/factions'
import gameOver from './reducers/gameOver'
import moneyByFaction from './reducers/moneyByFaction'
import units from './reducers/units'
import turn from './reducers/turn'
import worldMap from './reducers/worldMap'

import killUnitSaga from './sagas/killUnit'

const reducer = createReducer({
  buildings, // must be before units
  factions,
  currentFaction, // must be after factions
  moneyByFaction,
  turn,
  units, // must be after buildings and currentFaction
  gameOver, // must be after buildings and units and turn
  worldMap,
})

function* rootSaga() {
  yield all([
    killUnitSaga(),
  ])
}

// // function loggerMiddleware() {
// //   return next => action => {
// //     console.log('Action', action.type, action.payload)

// //     return next(action)
// //   }
// // }

// A lightweight store of AI computations
function createAiStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const enhancer = compose(applyMiddleware(sagaMiddleware))
  // const enhancer = compose(applyMiddleware(sagaMiddleware, loggerMiddleware))
  
  const store = createStore(reducer, initialState, enhancer)

  // To store the AI actions
  store.actions = []

  sagaMiddleware.run(rootSaga)

  return store
}

export default createAiStore
