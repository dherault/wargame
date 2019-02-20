import store from '../../state/store'

function getWorldStateFromStore() {
  const { units, turnOrder } = store.getState()

  return { units, turnOrder }
}

export default getWorldStateFromStore