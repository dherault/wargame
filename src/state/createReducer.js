function createReducer(reducers) {
  return (state = {}, action) => {
    const nextState = {}
  
    // Adding two extra arguments to reducers:
    // - state previous to action
    // - ongoing modified state
    Object.keys(reducers).forEach(key => {
      nextState[key] = reducers[key](state[key], action, state, nextState)
    })
  
    return nextState
  }
}

export default createReducer