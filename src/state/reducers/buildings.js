import { findById } from '../../lib/utils'

/*
  An array of buildings
*/
function buildings(state = [], action, globalState) {
  switch (action.type) {
    case 'SET_BUILDINGS':
      return action.payload

    case 'CAPTURE_BUILDING': {
      const buildings = state.slice()
      const { buildingId, unitId } = action.payload
      const buildingIndex = buildings.findIndex(building => building.id === buildingId)
      const unit = findById(globalState.units, unitId)
      
      buildings[buildingIndex] = Object.assign({}, buildings[buildingIndex])
      buildings[buildingIndex].capture -= unit.life / 2

      if (buildings[buildingIndex].capture <= 0) {
        buildings[buildingIndex].capture = 100
        buildings[buildingIndex].team = unit.team
        buildings[buildingIndex].factionId = unit.factionId
      }

      return buildings
    }

    default:
      return state
  }
}

export default buildings
