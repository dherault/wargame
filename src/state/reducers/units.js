function units(state = [], action) {
  switch (action.type) {
    case 'SET_UNITS':
      return action.payload

    case 'MOVE_UNIT': 
      const units = state.slice()
      const { unit, tile } = action.payload
      const unitIndex = units.findIndex(u => u.id === unit.id)
      units[unitIndex] = Object.assign({}, units[unitIndex], { position: tile, played: true })

      return units

    default:
      return state
  }
}

export default units
