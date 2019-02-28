import { findById } from '../../lib/common/utils'

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

      // We start capturing the building
      building.capture -= Math.ceil(unit.life / 2)

      // If the building is captured
      if (building.capture <= 0) {
        const previousFactionId = building.factionId
        
        building.capture = 100 // Reset its capture level
        building.team = unit.team // Switch sides
        building.factionId = unit.factionId

        // If the building captured was an HQ, 
        // reset all other buildings from the capured faction
        if (building.type === 'HEADQUARTERS') {
          building.type = 'CITY' // Once an HQ, now a simple city

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
