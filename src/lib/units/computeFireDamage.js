import store from '../../state/store'
import computeRangeTiles from './computeRangeTiles'
import gameConfiguration from '../gameConfiguration'

function computeFireDamage(attacker, defender, globalState) {
  const { unitMenu } = globalState || store.getState()

  const defenderInRange = computeRangeTiles(attacker, unitMenu.firePosition, globalState).some(tile => tile.x === defender.position.x && tile.y === defender.position.y)

  if (!defenderInRange) return [0, 0]

  const attackDamage = computeAttackDamage(attacker, defender, globalState)
  const nextDefender = Object.assign({}, defender, { life: defender.life - attackDamage })

  if (nextDefender.life <= 0) return [attackDamage, 0]

  const attackerInRange = computeRangeTiles(defender, null, globalState).some(tile => tile.x ===  unitMenu.firePosition.x && tile.y ===  unitMenu.firePosition.y)

  if (!attackerInRange) return [attackDamage, 0]

  const counterAttackDamage = computeAttackDamage(nextDefender, attacker, globalState)

  return [attackDamage, counterAttackDamage]
}

function computeAttackDamage(attacker, defender, globalState) {
  const { worldMap } = globalState || store.getState()
  const defenderTileType = worldMap[defender.position.y][defender.position.x].type

  const initialDamage = gameConfiguration.unitsConfiguration[attacker.type].damages[defender.type]
  const lifeModifier = attacker.life / 100
  const terrainModifier = 1 - gameConfiguration.terrainConfiguration[defenderTileType].defense / 10
  
  return Math.round(initialDamage * lifeModifier * terrainModifier)
}

export default computeFireDamage