import gameConfiguration from '../gameConfiguration'
import globalStore from '../../state/store'
import createAiStore from '../../state/createAiStore'
import computeFireDamage from './computeFireDamage'
import computeRangePositions from './computeRangePositions'
import computeMovementPositions, { getSuccessorsFactory } from './computeMovementPositions'
import computeWorldStateScore from './computeWorldStateScore'
import Heap from '../common/Heap'
import Tree from '../common/Tree'
import { samePosition, hash, unhash, createId, randomSlice } from '../common/utils'

// Branching factor = min(maxBranchingFactor, nUnits ^ nTargets)
const nTargets = 2 
const maxBranchingFactor = 111

function computeAiActions() {
  // First we clone the game state into a lightweight store
  // It will be our root world state
  const rootState = globalStore.getState()
  const rootStore = createAiStore(rootState)
  
  const consideredFaction = rootState.currentFaction
  // const maxStateTreeDepth = rootState.factions.filter(faction => faction.alive).length - 1
  const maxStateTreeDepth = 0

  console.log('consideredFaction', consideredFaction.id)

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

  console.log('childrenStores.length', childrenStores.length)

  return selectedChildStore.actions
}

function extendStateTree(stateTree, parentStore, consideredFaction, maxDepth, depth = 0, alpha = -Infinity, beta = Infinity) {
  const parentState = parentStore.getState()
  
  console.log('depth', depth, parentState.currentFaction.id)
  
  if (depth > maxDepth || parentState.gameOver) {
    return parentStore.score = computeWorldStateScore(parentStore)[consideredFaction.id]
  }

  const parentNodeTypeFn = consideredFaction.team === parentState.currentFaction.team ? Math.max : Math.min

  // Value init
  parentStore.score = parentNodeTypeFn === Math.max ? -Infinity : Infinity

  let stores = [parentStore]

  function recurseOnUnits(units) {
    if (!units.length) return

    const selectedUnit = units[0]
    const nextStores = []

    stores.forEach(store => {
      const targets = randomSlice(computePossibleTargets(store, selectedUnit), nTargets)

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
        
        nextStore.id = createId()

        actions.forEach(nextStore.dispatch)

        nextStores.push(nextStore)
      })
    })

    if (nextStores.length) {
      stores = nextStores
    }

    recurseOnUnits(units.slice(1))
  } 

  const units = parentState.units
    .filter(u => u.factionId === parentState.currentFaction.id)
    .sort((a, b) => {
      const aConfiguration = gameConfiguration.unitsConfiguration[a.type]
      const bConfiguration = gameConfiguration.unitsConfiguration[b.type]

      return aConfiguration.range[1] > bConfiguration.range[1] || aConfiguration.power > bConfiguration.power ? -1 : 1

      // TODO: if unit is blocked, return +1 or more
    })

  recurseOnUnits(units)

  const selectedStores = randomSlice(stores, maxBranchingFactor)

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
  
  // console.log('stores', stores)

  return parentStore.score
}

function computePossibleTargets(store, unit) {
  const { units, buildings } = store.getState()
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
        && unit.life < 100 
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
  const { buildings } = store.getState()
  const [type, targetId, position] = target
  
  const pathToTarget = aStarSearch(store, unit, unit.position, position) 
  const movementPositions = computeMovementPositions(store, unit)
  
  const extremePosition = pathToTarget
    .reverse()
    .find(position => samePosition(position, unit.position) || movementPositions.some(p => samePosition(p, position)))

  // console.log(target, pathToTarget, extremePosition)

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

/*
from http://theory.stanford.edu/~amitp/GameProgramming/ImplementationNotes.html

OPEN = priority queue containing START
CLOSED = empty set
while lowest rank in OPEN is not the GOAL:
  current = remove lowest rank item from OPEN
  add current to CLOSED
  for neighbors of current:
    cost = g(current) + movementcost(current, neighbor)
    if neighbor in OPEN and cost less than g(neighbor):
      remove neighbor from OPEN, because new path is better
    if neighbor in CLOSED and cost less than g(neighbor):  
      remove neighbor from CLOSED
    if neighbor not in OPEN and neighbor not in CLOSED:
      set g(neighbor) to cost
      add neighbor to OPEN
      set priority queue rank to g(neighbor) + h(neighbor)
      set neighbor's parent to current

reconstruct reverse path from goal to start
by following parent pointers
*/

// Mahattan heuristic (h function)
const manhattanHeuristic = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y)


function aStarSearch(store, unit, startPosition, goalPosition) {
  const { worldMap, units } = store.getState()
  const { movementType } = gameConfiguration.unitsConfiguration[unit.type]
  const startPositionHash = hash(startPosition)
  const goalPositionHash = hash(goalPosition)

  const open = new Heap()
  const closed = new Set()

  open.insert(0, startPositionHash)

  const hashToCost = {}
  const hashToParent = {}

  hashToCost[startPositionHash] = 0

  while (open.size) {
    // current = remove lowest rank item from OPEN
    
    const currentPositionHash = open.extractMin()[1]
    const currentPosition = unhash(currentPositionHash)

    // while lowest rank in OPEN is not the GOAL
    if (currentPositionHash === goalPositionHash) {
      break
    }

    // add current to CLOSED
    closed.add(currentPositionHash)

    // for neighbors of current:
    const { x, y } = currentPosition
    const neighbors = []

    if (worldMap[y] && worldMap[y][x - 1]) neighbors.push({ x: x - 1, y })
    if (worldMap[y] && worldMap[y][x + 1]) neighbors.push({ x: x + 1, y })
    if (worldMap[y - 1] && worldMap[y - 1][x]) neighbors.push({ x, y: y - 1 })
    if (worldMap[y + 1] && worldMap[y + 1][x]) neighbors.push({ x, y: y + 1 })

    neighbors.forEach(neighborPosition => {
      if (units.some(u => u.team !== unit.team && samePosition(u.position, neighborPosition))) {
        return
      }

      const neighborHash = hash(neighborPosition)

      // cost = g(current) + movementcost(neighbor)
      const cost = hashToCost[currentPositionHash] + gameConfiguration.terrainConfiguration[worldMap[neighborPosition.y][neighborPosition.x]].movementCost[movementType]

      if (cost === Infinity) return

      // if neighbor in OPEN and cost less than g(neighbor):
      if (open.has(neighborHash) && cost < hashToCost[neighborHash]) {
        // remove neighbor from OPEN, because new path is better
        open.deleteByData(neighborHash)
      }

      // if neighbor in CLOSED and cost less than g(neighbor):
      // This should never happen if you have an consistent admissible heuristic.
      if (closed.has(neighborHash) && cost < hashToCost[neighborHash]) {
        closed.delete(neighborHash)
      }
      // if neighbor not in OPEN and neighbor not in CLOSED:
      if (!open.has(neighborHash) && !closed.has(neighborHash)) {
        // set g(neighbor) to cost
        hashToCost[neighborHash] = cost
        // set neighbor's parent to current
        hashToParent[neighborHash] = currentPosition
        // set priority queue rank to g(neighbor) + h(neighbor)
        const rank = cost + manhattanHeuristic(neighborPosition, goalPosition)
        // add neighbor to OPEN
        open.insert(rank, neighborHash)
      }
    })
  }

  // Reconstruct path from goal to start
  const path = []

  path.push(goalPosition)

  let currentPositionHash = hash(goalPosition)

  while (currentPositionHash !== startPositionHash) {
    const parent = hashToParent[currentPositionHash]

    path.unshift(parent)

    currentPositionHash = hash(parent)
  }

  // path.unshift(startPosition)

  return path
}
export default computeAiActions
