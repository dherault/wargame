import store from '../../state/store'

function getWorldStateFromStore() {
  const { units, factions } = store.getState()

  return { units, factions }
}

export default getWorldStateFromStore