/*
  A queue for webworker-computed AI actions
*/
function aiActions(state = [], action) {
  if (action.type === 'SET_AI_ACTIONS') {
    return action.payload
  }

  if (action.type === 'RESET_AI_ACTIONS') {
    return []
  }

  return state
}

export default aiActions
