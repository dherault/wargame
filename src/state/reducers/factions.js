/*
  id
  team
  type // HUMAN/COMPUTER
*/
function factions(state = [], action) {
  switch (action.type) {
    case 'SET_FACTIONS':
      return action.payload

    default:
      return state
  }
}

export default factions
