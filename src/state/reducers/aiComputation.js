function aiComputation(state = false, action) {
  switch (action.type) {
    case 'BEGIN_AI_COMPUTATION':
      return true
    
    case 'END_AI_COMPUTATION':
      return false
    
    default:
      return state
  }
}

export default aiComputation
