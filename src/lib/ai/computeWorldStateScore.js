import gameConfiguration from '../gameConfiguration'

function computeWorldStateScore(store) {
  const { units, buildings, factions } = store.getState()

  // Build a score per unit and sum up by factionId
  const scoreByFaction = {}
  const hqCaptureByFaction = {}
  const maximizableScoreByFaction = {}

  factions.forEach(faction => scoreByFaction[faction.id] = 0)
  units.forEach(unit => scoreByFaction[unit.factionId] += computeUnitScore(store, unit))
  buildings.forEach(building => {
    if (building.factionId !== null) {
      scoreByFaction[building.factionId] += 1000
    }
    if (building.type === 'HEADQUARTERS') {
      hqCaptureByFaction[building.factionId] = building.capture
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

export function computeUnitScore(store, unit) {
  const { units } = store.getState()
  const unitConfiguration = gameConfiguration.unitsConfiguration[unit.type]

  let attackableUnitsScore = 0

  units.forEach(u => attackableUnitsScore += unitConfiguration.damages[u.type] || 0)

  return Math.round(unit.life / 100 * attackableUnitsScore)
}

export default computeWorldStateScore