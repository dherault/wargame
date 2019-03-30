import gameConfiguration from '../gameConfiguration'
import { samePosition } from '../common/utils'

function computeWorldStateScore(store) {
  const { units, buildings, factions } = store.getState()

  // Build a score per unit and sum up by factionId
  const scoreByFaction = {}
  const hqCaptureByFaction = {}
  const maximizableScoreByFaction = {}

  factions.forEach(faction => scoreByFaction[faction.id] = 0)
  units.forEach(unit => scoreByFaction[unit.factionId] += computeUnitScore(unit))
  buildings.forEach(building => {
    if (building.factionId !== null && building.capture === gameConfiguration.maxBuildingCapture) {
      scoreByFaction[building.factionId] += 1000
    }
    if (building.type === 'HEADQUARTERS') {
      hqCaptureByFaction[building.factionId] = building.capture
    }
    else if (building.capture < gameConfiguration.maxBuildingCapture) {
      const capturingUnit = units.find(u => samePosition(u.position, building.position))

      if (capturingUnit) {
        scoreByFaction[capturingUnit.factionId] += (gameConfiguration.maxBuildingCapture - building.capture) * 10
      }
    }
  })

  factions.forEach(faction => {
    // No HQ means score = 0
    if (!hqCaptureByFaction[faction.id]) {
      scoreByFaction[faction.id] = 0
    }
    // The score is multiplied by the HQ's capture
    else {
      scoreByFaction[faction.id] *= hqCaptureByFaction[faction.id] / 100
    }
  })

  factions.forEach(faction => {
    maximizableScoreByFaction[faction.id] = 0
    factions.forEach(f => {
      if (f.team === faction.team) maximizableScoreByFaction[faction.id] += scoreByFaction[f.id]
      else maximizableScoreByFaction[faction.id] -= scoreByFaction[f.id]
    })
  })

  return maximizableScoreByFaction
}

export function computeUnitScore(unit) {
  return unit.life * gameConfiguration.unitsConfiguration[unit.type].power
}

export default computeWorldStateScore
