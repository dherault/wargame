import gameConfiguration from '../gameConfiguration'

function computeWorldStateScore(store) {
  const { units, buildings, factions } = store.getState()

  // Build a score per unit and sum up by factionId
  const scoreByFaction = {}
  const minScoreByFaction = {}

  factions.forEach(faction => scoreByFaction[faction.id] = 0)
  units.forEach(unit => scoreByFaction[unit.factionId] += computeUnitScore(store, unit))
  buildings.forEach(building => {
    if (building.factionId !== null) {
      scoreByFaction[building.factionId] += 1000
    }
  })

  factions.forEach(faction => {
    minScoreByFaction[faction.id] = 0
    factions.forEach(f => {
      if (f.team === faction.team) minScoreByFaction[faction.id] += scoreByFaction[f.id]
      else minScoreByFaction[faction.id] -= scoreByFaction[f.id]
    })
  })

  return minScoreByFaction
}

export function computeUnitScore(store, unit) {
  const { units } = store.getState()
  const unitConfiguration = gameConfiguration.unitsConfiguration[unit.type]

  let attackableUnitsScore = 0

  units.forEach(u => attackableUnitsScore += unitConfiguration.damages[u.type] || 0)

  return Math.round(unit.life / 100 * attackableUnitsScore)
}

export default computeWorldStateScore