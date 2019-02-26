import computeRangePositions from './computeRangePositions'
import gameConfiguration from '../gameConfiguration'
import { samePosition, findById } from '../utils'

// Takes in a attacker id and a defender id
// Returns an array defining the attack and counter attack damages
function computeFireDamage(store, attackerId, defenderId, attackerPosition) {
  const { units } = store.getState()
  const attacker = findById(units, attackerId)
  const defender = findById(units, defenderId)
  const position = attackerPosition || attacker.position

  const defenderInRange = computeRangePositions(store, attacker, position).some(position => samePosition(position, defender.position))

  // This should never happen but it make the function correct
  if (!defenderInRange) return [0, 0]

  const attackDamage = computeAttackDamage(store, attacker, defender)
  const nextDefender = Object.assign({}, defender, { life: defender.life - attackDamage })

  // If the defender is dead it cannot counter attack
  if (nextDefender.life <= 0) return [attackDamage, 0]

  const attackerInRange = computeRangePositions(store, defender, null).some(p => samePosition(p, position))

  // If the defender has not the attacker in its range it cannot counter attack
  if (!attackerInRange) return [attackDamage, 0]

  const counterAttackDamage = computeAttackDamage(store, nextDefender, attacker, position)

  return [attackDamage, counterAttackDamage]
}

function computeAttackDamage(store, attacker, defender, defenderPosition) {
  const { worldMap } = store.getState()
  const position = defenderPosition || defender.position
  const defenderTile = worldMap[position.y][position.x]

  const initialDamage = gameConfiguration.unitsConfiguration[attacker.type].damages[defender.type]
  const lifeModifier = attacker.life / 100
  const terrainModifier = 1 - gameConfiguration.terrainConfiguration[defenderTile].defense / 10
  
  return Math.round(initialDamage * lifeModifier * terrainModifier)
}

export default computeFireDamage
