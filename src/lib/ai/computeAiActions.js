import gameConfiguration from '../gameConfiguration';
import globalStore from '../../state/store'
import createAiStore from '../../state/createAiStore'
import computeWorldStateScore from './computeWorldStateScore'
import computeMovementPositions, { getSuccessorsFactory } from '../units/computeMovementPositions'
import computeRangePositions from '../units/computeRangePositions'
import computeFireDamage from '../units/computeFireDamage';
import Heap from '../common/Heap'
import Tree from '../common/Tree'
import { samePosition } from '../utils'

const hash = position => `${position.x}_${position.y}`
const unhash = positionHash => {
  const [x, y] = positionHash.split('_')

  return {
    x: parseInt(x),
    y: parseInt(y),
  }
}

// Branching factor = min(maxBranchingFactor, nUnits ^ nTargets)
const nTargets = 3 
const maxBranchingFactor = 15

function computeAiActions() {
  const rootState = globalStore.getState()
  const rootStore = createAiStore(rootState)
  
  const consideredFaction = rootState.currentFaction
  const maxStateTreeDepth = rootState.factions.filter(faction => faction.alive).length - 1
  
  console.log('consideredFaction', consideredFaction.id)
  console.log('units', rootState.units)

  const stateTree = new Tree()

  rootStore.stateTreeIndex = stateTree.addNode(rootStore)

  extendStateTree(stateTree, rootStore, consideredFaction, maxStateTreeDepth)

  // Post-order search on stateTree
  // https://stackoverflow.com/a/20062584
  const postOrder = index => {
    stateTree.getChildren(index).forEach(postOrder)

    const store = stateTree.getData(index)
    const childrenStores = stateTree.getChildrenData(index) // TODO transform O(n) into O(1)
    
    if (!childrenStores.length) {
      return 
    }
    
    const nodeTypeFn = consideredFaction.team === store.getState().currentFaction.team ? Math.max : Math.min
    
    store.score = nodeTypeFn(...childrenStores.map(store => store.score))
  }

  postOrder(rootStore.stateTreeIndex)

  const selectedChildStore = stateTree.getChildrenData(rootStore.stateTreeIndex).sort((a, b) => a.score > b.score ? -1 : 1)[0]

  console.log('stateTree', stateTree)

  return selectedChildStore ? selectedChildStore.actions : []
}

function extendStateTree(stateTree, parentStore, consideredFaction, maxDepth, depth = 0) {
  if (depth > maxDepth) return

  console.log('depth', depth, parentStore.getState().currentFaction.id)

  const parentWorldState = parentStore.getState()
  
  const possibleActions = expandPossibleActions(parentStore)
  const actionsCombinaisons = combineArrayItems(possibleActions)
  
  // console.log('possibleActions', possibleActions)
  // console.log('actionsCombinaisons', actionsCombinaisons)

  const stores = []
  let caducStores = 0

  actionsCombinaisons.forEach((actions, i) => {

    const store = createAiStore(parentWorldState)
    
    try {
      actions.forEach(store.dispatch)
    }
    // The store is impossible (some units are on the same position, the defender is dead, ...)
    catch (error) {
      caducStores++
      return
    }

    store.dispatch({ type: 'END_PLAYER_TURN' })
    store.dispatch({ type: 'BEGIN_PLAYER_TURN' })
    
    store.actions = actions
    store.score = computeWorldStateScore(store)[consideredFaction.id]

    stores.push(store)
  })

  console.log(possibleActions.length, actionsCombinaisons.length, stores.length, caducStores)

  stores
    .sort((a, b) => a.score > b.score ? -1 : 1)
    .forEach((store, i) => {
      if (i >= maxBranchingFactor) return

      stateTree.addNode(store, parentStore.stateTreeIndex)

      extendStateTree(stateTree, store, consideredFaction, maxDepth, depth + 1)
    })
}

// https://stackoverflow.com/a/4331218
function combineArrayItems(array) {
  if (array.length === 0) {
    return []
  }
  if (array.length === 1) {
    return array[0]
  } 

  const result = []
  let recursiveCombinaisons = combineArrayItems(array.slice(1))  // Recur with the rest of array

  for (let i = 0; i < array[0].length; i++) {
    for (let j = 0; j < recursiveCombinaisons.length; j++) {
      result.push([...array[0][i], ...recursiveCombinaisons[j]]);
    }
  }

  return result
}

function expandPossibleActions(store) {
  const { units, currentFaction } = store.getState()

  const possibleUnitTargets = []

  // For each unit, determine a unit or building target
  units.forEach(unit => {
    if (unit.factionId !== currentFaction.id) return

    const possibleTargets = computePossibleTarget(store, unit)

    const chosenTargets = []

    for (let i = 0; i < nTargets; i++) {
      if (possibleTargets[i]) {
        chosenTargets.push(possibleTargets[i])
      }
    }

    possibleUnitTargets.push([unit, chosenTargets])
  })

  console.log('possibleUnitTargets', possibleUnitTargets)
  // console.log('transmorming targets into actions') 

  const possibleUnitActions = []

  possibleUnitTargets.forEach(([unit, targets]) => {
    const serializedActions = new Set()

    targets.forEach(target => {
      serializedActions.add(JSON.stringify(transformTargetIntoActions(store, unit, target)))
    })

    const actions = []

    // dedupe actions
    serializedActions.forEach(serializedAction => actions.push(JSON.parse(serializedAction)))

    if (actions.length) possibleUnitActions.push(actions)

    // console.log('possible actions per unit', unit, actions)
  })

  return possibleUnitActions
}

// Uniform cost search to look for possible targets
function computePossibleTarget(store, unit) {
  const { units, buildings } = store.getState()
  const unitConfiguration = gameConfiguration.unitsConfiguration[unit.type]
  
  const getSuccessors = getSuccessorsFactory(store, unit)

  const targets = []
  const openSet = new Heap()
  const closedSet = new Set()

  openSet.insert(0, unit.position)

  while (openSet.size) {
    // Extract first candidate from heap
    const [cost, position] = openSet.extractMin()

    // If cost is Infinity, ignore candidate
    if (cost === Infinity) continue

    // If another unit is on the position, ignore the position
    if (units.some(u => u.id !== unit.id && samePosition(u.position, position))) continue

    const rangePositions = computeRangePositions(store, unit, position)

    units.forEach(u => {
      const potentialDamages = unitConfiguration.damages[u.type]

      if (
        u.team !== unit.team &&
        rangePositions.some(position => samePosition(position, u.position)) &&
        potentialDamages
      ) {
        targets.push(['FIRE', u.id, position, cost / potentialDamages])
      }
    })

    if (unit.type === 'INFANTERY') {
      const buidling = buildings.find(building => samePosition(position, building.position))

      if (buidling && buidling.team !== unit.team) {
        const costDivider = buidling.team ? 110 : 100 // priorities opposite team capture

        targets.push(['CAPTURE', buidling.id, position, cost / costDivider])
      }
    }

    if (targets.length === nTargets) break

    closedSet.add(hash(position))

    // For each successor (adjacent position with updated cost)
    getSuccessors(position, cost).forEach(({ position, cost }) => {
      if (closedSet.has(hash(position))) return

      // If the position is not already in the heap
      if (!openSet.list.some(item => item[1] && samePosition(item[1], position))) {
        openSet.insert(cost, position)
      }
    })

  }

  return targets.sort((a, b) => a[2] <= b[2] ? 1 : -1)
}

function transformTargetIntoActions(store, unit, target) {
  const { buildings } = store.getState()
  const [type, targetId, position] = target
  
  const pathToTarget = aStarSearch(store, unit, unit.position, position) 
  const possibleMovementPositions = computeMovementPositions(store, unit)
  
  const extremePosition = pathToTarget.reverse().find(position => position === unit.position || possibleMovementPositions.some(p => samePosition(p, position)))

  const actions = []
  let unitIdDead = false

  if (extremePosition && !samePosition(unit.position, extremePosition)) {
    actions.push({
      type: 'MOVE_UNIT',
      payload: {
        unitId: unit.id,
        position: extremePosition,
      },
    })
  }

  if (extremePosition && samePosition(position, extremePosition)) {
    if (type === 'FIRE') {
      const damages = computeFireDamage(store, unit.id, targetId, position)

      actions.push({
        type,
        payload: {
          attackerId: unit.id,
          defenderId: targetId,
          damages: damages,
        },
      })

      unitIdDead = damages[1] >= unit.life
    }
  
    if (type === 'CAPTURE') {
      actions.push({
        type,
        payload: {
          buildingId: buildings.find(building => samePosition(building.position, position)).id,
          unitId: unit.id,
        },
      })
    }
  }

  if (!unitIdDead) {
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

  return path
}

export default computeAiActions