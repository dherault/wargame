import globalStore from '../../state/store'
import createAiStore from '../../state/createAiStore'

function computeAiActions() {

  const initialWorldState = globalStore.getState()

  const aiStore = createAiStore(initialWorldState)

  const possibleActions = expandPossibleActions(aiStore)

  return possibleActions
}

function expandPossibleActions(store) {
  const { units, buildings } = store.getState()

  return []
}

export default computeAiActions