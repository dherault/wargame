import gameConfiguration from '../gameConfiguration'
import createAiStore from '../../state/createAiStore'
import computeFireDamage from './computeFireDamage'
import computeRangePositions from './computeRangePositions'
import computeMovementPositions, { getSuccessorsFactory } from './computeMovementPositions'
import computeWorldStateScore from './computeWorldStateScore'
import Heap from '../common/Heap'
import Tree from '../common/Tree'
import aStarSearch from '../common/aStarSearch'
import { samePosition, hash, unhash, randomSlice, manhattanDistance, chance, randomPop } from '../common/utils'

// Branching factor = min(maxBranchingFactor, nUnits ^ nTargets)
const maxBranchingFactor = 111

/*

  To compute which actions  the computer takes ('MOVE_UNIT', 'FIRE', 'CAPTURE', ...)
  we will perform an adversarial search with alpha-beta pruning
  The idea here is to compute a state tree, ie a tree of world states (stores)
  Each node is either a max or min node (node type), depending on which team the player it represents is in
  (player from same team => max node, opposite team => min node)
  We affect a score to each leaf node of the tree
  traverse up the tree affecting a score to the parent = min or max of scores of children depending on the node type
  and take the root's child that has the best possible score
  It will determine which state to play, ie. which actions to take to get to this state from our root state
  more details:
  Adversarial search: https://youtu.be/cwbjLIahbv8 and http://ai.berkeley.edu/lecture_slides.html lecture 6
  Alpha-beta pruning: https://youtu.be/jvpWtwVSvjA and https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning#Pseudocode
*/
function computeAiActions(rootState, isNextTurn) {
  // First we clone the game state into a lightweight store
  // It will be our root world state
  const rootStore = createAiStore(rootState)

  if (isNextTurn) {
    // The AI considers the next player's moves, hence the new turn
    rootStore.dispatch({ type: 'END_PLAYER_TURN' })
    rootStore.dispatch({ type: 'BEGIN_PLAYER_TURN' })
  }

  const state = rootStore.getState()
  const consideredFaction = state.currentFaction
  const nAliveFactions = state.factions.filter(faction => faction.alive).length
  const nUnits = state.units.length

  let maxStateTreeDepth

  if (nUnits <= 10) maxStateTreeDepth = nAliveFactions - 1
  else if (nUnits <= 15) maxStateTreeDepth = 1
  else maxStateTreeDepth = 0

  console.log('AI: consideredFaction', consideredFaction.id, 'maxStateTreeDepth', maxStateTreeDepth)

  const stateTree = new Tree()

  rootStore.stateTreeIndex = stateTree.addNode(rootStore)

  // Add child nodes to the state tree
  extendStateTree(stateTree, rootStore, consideredFaction, maxStateTreeDepth)

  // console.log('stateTree', stateTree)

  // We select the root's child with the highest score
  const childrenStores = stateTree.getChildrenData(rootStore.stateTreeIndex)

  // If the root state has no viable children we return no actions to take
  if (!childrenStores.length) return []

  const selectedChildStore = childrenStores.sort((a, b) => a.score > b.score ? -1 : 1)[0]

  // console.log('childrenStores.length', childrenStores.length)

  return selectedChildStore.actions
}

// Extends the state tree with new children
function extendStateTree(stateTree, parentStore, consideredFaction, maxDepth, depth = 0, alpha = -Infinity, beta = Infinity) {
  const parentState = parentStore.getState()
  // console.log('depth', depth, parentState.currentFaction.id, parentState.turn, parentState.gameOver)

  if (depth > maxDepth || parentState.gameOver) {
    return parentStore.score = computeWorldStateScore(parentStore)[consideredFaction.id]
  }

  // Is this node a MAX or MIN node ?
  const parentNodeTypeFn = consideredFaction.team === parentState.currentFaction.team ? Math.max : Math.min

  // Value init
  parentStore.score = parentNodeTypeFn === Math.max ? -Infinity : Infinity

  let stores = [createAiStore(parentState)]

  function recurseOnUnits(units, nTargets) {
    if (!units.length) return

    const selectedUnit = units[0]
    const nextStores = []

    stores.forEach(store => {
      const targets = randomSlice(computePossibleTargets(store, selectedUnit, nTargets), nTargets)

      if (!targets.length) return

      // console.log('possible targets', selectedUnit.id, targets)

      // Dedupe actions
      const serializedActionsGroups = new Set()

      targets.forEach(target => {
        serializedActionsGroups.add(JSON.stringify(transformTargetIntoActions(store, selectedUnit, target)))
      })

      const actionsGroups = []

      // dedupe actionsGroups
      serializedActionsGroups.forEach(serializedAction => actionsGroups.push(JSON.parse(serializedAction)))

      // console.log('actionsGroups', actionsGroups)

      if (!actionsGroups.length) return

      actionsGroups.forEach(actions => {
        if (!actions.length) return

        const nextStore = createAiStore(store.getState())

        nextStore.actions = [...store.actions, ...actions]

        actions.forEach(nextStore.dispatch)

        nextStores.push(nextStore)
      })
    })

    if (nextStores.length) {
      stores = nextStores
    }

    recurseOnUnits(units.slice(1), nTargets)
  }

  const units = parentState.units
    .filter(unit => unit.factionId === parentState.currentFaction.id)
    .sort((a, b) => {
      const aConfiguration = gameConfiguration.unitsConfiguration[a.type]
      const bConfiguration = gameConfiguration.unitsConfiguration[b.type]

      if (gameConfiguration.infanteryUnitTypes.includes(a.type)) {
        const building = parentState.buildings.find(building => samePosition(a.position, building.position))

        if (building && building.factionId !== a.factionId) return -1
      }

      return aConfiguration.range[1] > bConfiguration.range[1] || aConfiguration.power > bConfiguration.power ? -1 : 1

      // TODO: if unit is blocked, return +1 or more
    })

  let nTargets

  if (units.length > 12) nTargets = 1
  else if (units.length > 6) nTargets = 2
  else nTargets = 3

  recurseOnUnits(units, nTargets)

  // console.log('units', units)

  const selectedStores = randomSlice(stores, maxBranchingFactor)

  selectedStores.forEach(store => addCreateUnitActions(store))

  // console.log('selectedStores', selectedStores)

  for (let i = 0; i < selectedStores.length; i++) {
    const store = selectedStores[i]

    store.dispatch({ type: 'END_PLAYER_TURN' })
    store.dispatch({ type: 'BEGIN_PLAYER_TURN' })

    store.stateTreeIndex = stateTree.addNode(store, parentStore.stateTreeIndex) // We add the store to the state tree

    const childScore = extendStateTree(stateTree, store, consideredFaction, maxDepth, depth + 1, alpha, beta)

    // console.log('back to depth', depth, parentState.currentFaction.id, childScore)

    parentStore.score = parentNodeTypeFn(childScore, parentStore.score)

    if (parentNodeTypeFn === Math.max) {
      alpha = Math.max(alpha, parentStore.score)
    }
    else {
      beta = Math.min(beta, parentStore.score)
    }

    if (alpha >= beta) {
      // console.log('PRUNING!', depth)
      break
    }
  }

  return parentStore.score
}

function computePossibleTargets(store, unit, nTargets) {
  const { units, buildings } = store.getState()

  // Special case: the unit is capturing a building and healthy
  if (gameConfiguration.infanteryUnitTypes.includes(unit.type) && unit.life === gameConfiguration.maxUnitLife) {
    const buildingOnUnitPosition = buildings.find(b => samePosition(unit.position, b.position))

    // It will continue to capture
    if (buildingOnUnitPosition && buildingOnUnitPosition.team !== unit.team) {
      return [[['CAPTURE', buildingOnUnitPosition.id, unit.position]]]
    }
  }

  const { damages, movementType } = gameConfiguration.unitsConfiguration[unit.type]
  const getSuccessors = getSuccessorsFactory(store, unit)

  const targets = []
  const openSet = new Heap()
  const closedSet = new Set()

  openSet.insert(0, hash(unit.position))

  while (openSet.size) {
    // Extract first candidate from heap
    // Here cost is movement cost
    const [cost, positionHash] = openSet.extractMin()
    const position = unhash(positionHash)

    // If cost is Infinity, ignore candidate
    if (cost === Infinity) continue

    // If another unit is on the position, ignore the position
    if (!units.some(u => u.id !== unit.id && samePosition(u.position, position))) {

      // We look for potential ennemies on range to attack
      const rangePositions = computeRangePositions(store, unit, position)

      units.forEach(u => {
        const potentialDamages = damages[u.type]

        if (
          u.team !== unit.team && // If a unit from opposite team
          rangePositions.some(position => samePosition(position, u.position)) && // is on range at position
          potentialDamages // and can take damages
        ) {
          // The target's score here is the ennemy's distance divided by the potential damages
          // We want the smalled cost possible
          targets.push(['FIRE', u.id, position])
        }
      })

      const building = buildings.find(building => samePosition(position, building.position))

      // Infantery type can also capture building, we add that action to the list if a building is on the position
      if (gameConfiguration.infanteryUnitTypes.includes(unit.type) && building && building.team !== unit.team) {
        targets.push(['CAPTURE', building.id, position])
      }

      // Units can be repaired in a building
      if (
        building
        && unit.life < gameConfiguration.maxUnitLife
        && building.factionId === unit.factionId
        && gameConfiguration.buildingsConfiguration[building.type].reparableMovementTypes.includes(movementType)
      ) {
        targets.push(['REPAIR', building.id, position])
      }

      // If we reach the goal number of targets we stop the computation
      if (targets.length >= nTargets) break
    }

    closedSet.add(hash(position))

    // For each successor (adjacent position with updated cost)
    getSuccessors(position, cost).forEach(({ position, cost }) => {
      const positionHash = hash(position)

      if (closedSet.has(positionHash)) return

      // If the position is not already in the heap we insert it at rank = cost
      if (!openSet.has(positionHash)) {
        openSet.insert(cost, positionHash)
      }
    })
  }

  return targets
}

function transformTargetIntoActions(store, unit, target) {
  const { buildings, units } = store.getState()
  const [type, targetId, position] = target

  const pathToTarget = aStarSearch(store, unit, unit.position, position)
  const movementPositions = computeMovementPositions(store, unit)

  // Find the first position on the path to the target that
  const extremePosition = pathToTarget
    .reverse()
    .find(position =>
      // Is either the position of the unit
      samePosition(position, unit.position)
      // Or belongs to movementPositions and has no other unit on it
      || movementPositions.some(p => samePosition(p, position) && !units.some(u => samePosition(u.position, p)))
    )

  const actions = []
  let unitIsDead = false
  let unitIsPlayed = false

  if (extremePosition) {
    if (!samePosition(unit.position, extremePosition)) {
      actions.push({
        type: 'MOVE_UNIT',
        payload: {
          unitId: unit.id,
          position: extremePosition,
        },
      })

      unitIsPlayed = true
    }

    if (samePosition(extremePosition, position)) {
      if (type === 'FIRE') {
        const damages = computeFireDamage(store, unit.id, targetId, position)

        actions.push({
          type,
          payload: {
            attackerId: unit.id,
            defenderId: targetId,
            damages,
          },
        })

        unitIsDead = damages[1] >= unit.life
        unitIsPlayed = true
      }

      if (type === 'CAPTURE') {
        actions.push({
          type,
          payload: {
            buildingId: buildings.find(building => samePosition(building.position, position)).id,
            unitId: unit.id,
          },
        })

        unitIsPlayed = true
      }
    }
  }

  if (unitIsPlayed && !unitIsDead) {
    actions.push({
      type: 'PLAY_UNIT',
      payload: {
        unitId: unit.id,
      },
    })
  }

  return actions
}

function addCreateUnitActions(store) {
  const { buildings, units, currentFaction, turn } = store.getState()

  const ennemyHeadquarters = buildings.filter(building => building.team !== currentFaction.team && building.type === 'HEADQUARTERS')
  const ennemyUnits = units.filter(unit => unit.team !== currentFaction.team)

  // 12% chance global saving
  if (turn !== 1 && chance(0.12)) return

  buildings
    .filter(building =>
      building.factionId === currentFaction.id
      && gameConfiguration.buildingsConfiguration[building.type].creatableUnitMovementTypes.length
      && !units.some(unit => samePosition(unit.position, building.position))
    )
    .sort((a, b) => {
      let aDistanceToEnnemyHeadquarters = 0
      let bDistanceToEnnemyHeadquarters = 0

      ennemyHeadquarters.forEach(hq => {
        aDistanceToEnnemyHeadquarters += manhattanDistance(hq.position, a.position)
        bDistanceToEnnemyHeadquarters += manhattanDistance(hq.position, b.position)
      })

      return aDistanceToEnnemyHeadquarters <= bDistanceToEnnemyHeadquarters ? -1 : 1
    })
    .forEach(building => {
      // console.log('considering building', building)
      const { creatableUnitMovementTypes } = gameConfiguration.buildingsConfiguration[building.type]
      const money = store.getState().moneyByFaction[currentFaction.id]

      if (
        turn === 1
        && creatableUnitMovementTypes.includes(gameConfiguration.unitsConfiguration.INFANTERY.movementType)
        && money >= gameConfiguration.unitsConfiguration.INFANTERY.cost
      ) {
        const action = {
          type: 'CREATE_UNIT',
          payload: {
            type: 'INFANTERY',
            position: building.position,
            factionId: currentFaction.id,
            team: currentFaction.team,
          },
        }

        store.dispatch(action)
        store.actions.push(action)

        return
      }

      // 10% chance to save money on this building
      if (chance(0.1)) return

      const availableUnitsTypes = Object.entries(gameConfiguration.unitsConfiguration)
        .filter(entry => creatableUnitMovementTypes.includes(entry[1].movementType) && entry[1].cost <= money)
        .sort((a, b) => getAveragePower(a[1].damages, ennemyUnits) > getAveragePower(b[1].damages, ennemyUnits) ? -1 : 1)
        .map(entry => entry[0])

      // console.log('availableUnitsTypes', availableUnitsTypes)
      // 25% to choose the unit type at random
      const selectedUnitType = chance(0.25) ? randomPop(availableUnitsTypes) : availableUnitsTypes[0]

      if (availableUnitsTypes.length) {
        const action = {
          type: 'CREATE_UNIT',
          payload: {
            type: selectedUnitType,
            position: building.position,
            factionId: currentFaction.id,
            team: currentFaction.team,
          },
        }

        store.dispatch(action)
        store.actions.push(action)
      }
    })

}

function getAveragePower(damages, ennemyUnits) {
  if (!ennemyUnits.length) return 0

  let power = 0

  ennemyUnits.forEach(unit => power += damages[unit.type] || 0)

  return power / ennemyUnits.length
}

export default computeAiActions
