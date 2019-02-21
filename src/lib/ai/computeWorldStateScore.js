import gameConfiguration from '../gameConfiguration'

function computeWorldStateScore(store) {
  const { units, factions } = store.getState()

  // Build a score per unit and sum up by factionId
  const scorePerFaction = {}

  factions.forEach(faction => scorePerFaction[faction.id] = 0)
  units.forEach(unit => scorePerFaction[unit.factionId] += computeUnitScore(store, unit))

  return scorePerFaction
}

export function computeUnitScore(store, unit) {
  const { units } = store.getState()
  const unitConfiguration = gameConfiguration.unitsConfiguration[unit.type]

  let attackableUnitsScore = 0

  units.forEach(u => attackableUnitsScore += unitConfiguration.damages[u.type] || 0)

  return Math.round(unit.life / 100 * attackableUnitsScore)
}

export default computeWorldStateScore