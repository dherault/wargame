import { findById } from '../../lib/utils'

/*
  An array of buildings
*/
function buildings(state = [], action, globalState) {
  switch (action.type) {
    case 'SET_BUILDINGS':
      return action.payload

    case 'CAPTURE': {
      const buildings = state.slice()
      const { buildingId, unitId } = action.payload
      const buildingIndex = buildings.findIndex(building => building.id === buildingId)
      const unit = findById(globalState.units, unitId)
      
      const building = buildings[buildingIndex] = Object.assign({}, buildings[buildingIndex])
      building.capture -= unit.life / 2

      if (building.capture <= 0) {
        const previousFactionId = building.factionId

        building.capture = 100
        building.team = unit.team
        building.factionId = unit.factionId

        if (building.type === 'HEADQUARTERS') {
          building.type = 'CITY'

          buildings.forEach((building, i) => {
            if (building.factionId === previousFactionId) {
              buildings[i] = Object.assign({}, building, {
                team: 0,
                factionId: null,
              })
            }
          })
        }
      }

      return buildings
    }

    default:
      return state
  }
}

export default buildings
