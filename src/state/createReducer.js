// Replaces redux's combineReducers to enhance reducers
function createReducer(reducers) {
  const reducersKeys = Object.keys(reducers)

  return (state = {}, action) => {
    const nextState = {}

    // Adding two extra arguments to reducers:
    // - state previous to action
    // - ongoing modified state
    reducersKeys.forEach(key => {
      nextState[key] = reducers[key](state[key], action, state, nextState)
    })

    return nextState
  }
}

export default createReducer
