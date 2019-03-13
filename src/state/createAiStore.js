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
import worldMap from './reducers/worldMap'

import unitsSaga from './sagas/units'

const reducer = createReducer({
  isAiStore: () => true,
  buildings, // must be before units
  factions,
  currentFaction, // must be after factions
  moneyByFaction,
  units, // must be after buildings and currentFaction
  gameOver, // must be after buildings and units
  worldMap,
})

function* rootSaga() {
  yield all([
    unitsSaga(),
  ])
}

// function loggerMiddleware() {
//   return next => action => {
//     console.log('Action', action.type, action.payload)

//     return next(action)
//   }
// }

// A lightweight store of AI computations
const createAiStore = initialState => {
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
