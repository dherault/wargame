import gameConfiguration from '../gameConfiguration'

function computeWorldStateScore(worldState) {
  const { units, turnOrder } = worldState

  // Build a score per unit and sum up by faction
  const scorePerFaction = {}

  turnOrder.forEach(player => scorePerFaction[player.faction] = 0)

  units.forEach(unit => scorePerFaction[unit.faction] += computeUnitScore(worldState, unit))

  return scorePerFaction
}

export function computeUnitScore(worldState, unit) {
  const { units } = worldState
  const unitConfiguration = gameConfiguration.unitsConfiguration[unit.type]

  let attackableUnitsScore = 0
  let unitsThatCanAttackScore = 0

  units.forEach(u => attackableUnitsScore += unitConfiguration.damages[u.type] || 0)
  units.forEach(u => unitsThatCanAttackScore += gameConfiguration.unitsConfiguration[u.type].damages[unit.type] || 0)

  return Math.round(unit.life / 100 * (attackableUnitsScore - 0.5 * unitsThatCanAttackScore))
}

export default computeWorldStateScore