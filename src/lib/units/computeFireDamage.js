import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'

function computeFireDamage(attacker, defender) {
  const attackDamage = computeAttackDamage(attacker, defender)
  const nextDefender = Object.assign({}, defender, { life: defender.life - attackDamage })
  const counterAttackDamage = nextDefender.life <= 0 ? 0 : computeAttackDamage(nextDefender, attacker)

  return [attackDamage, counterAttackDamage]
}

function computeAttackDamage(attacker, defender) {
  const { worldMap } = store.getState()
  const defenderTileType = worldMap[defender.position.y][defender.position.x].type

  const initialDamage = gameConfiguration.unitsConfiguration[attacker.type].damages[defender.type]
  const terrainModifier = 1 - gameConfiguration.terrainConfiguration[defenderTileType].defense / 10
  
  return Math.round(initialDamage * terrainModifier)
}

export default computeFireDamage