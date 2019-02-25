import gameConfiguration from '../gameConfiguration';
import globalStore from '../../state/store'
import createAiStore from '../../state/createAiStore'
import computeWorldStateScore from './computeWorldStateScore'
import computeMovementPositions, { getSuccessorsFactory } from '../units/computeMovementPositions'
import computeRangePositions from '../units/computeRangePositions'
import computeFireDamage from '../units/computeFireDamage';
import Heap from '../common/Heap'
import Tree from '../common/Tree'
import { samePosition, hash, unhash } from '../utils'

// Branching factor = min(maxBranchingFactor, nUnits ^ nTargets)
const nTargets = 3 
const maxBranchingFactor = 15

/*
  To compute which actions ('MOVE_UNIT', 'FIRE', 'CAPTURE', ...) the computer takes
  we will perform an adversarial search with alpha-beta pruning (https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)
  The idea here is to compute a state tree, ie a tree of world states (stores)
  Each node is either a max or min node (node type), depending on which player it represents
  (player from same team => max node, opposite team => min node)
  We affect a score to each leaf node of the tree
  traverse up the tree affecting a score to the parent = min or max of scores of children depending on the node type
  and take the root's child that has the best possible score
  It will determine which state to play, ie. which actions to take to get to this state from our root state
  more details https://youtu.be/cwbjLIahbv8 and http://ai.berkeley.edu/lecture_slides.html lecture 6
*/
function computeAiActions() {
  // First we clone the game state into a lightweight store
  // It will be our root world state
  const rootState = globalStore.getState()
  const rootStore = createAiStore(rootState)
  
  const consideredFaction = rootState.currentFaction
  const maxStateTreeDepth = rootState.factions.filter(faction => faction.alive).length - 1
  
  console.log('consideredFaction', consideredFaction.id)

  const stateTree = new Tree()

  rootStore.stateTreeIndex = stateTree.addNode(rootStore)

  // Add child nodes to the state tree
  extendStateTree(stateTree, rootStore, consideredFaction, maxStateTreeDepth)

  // Post-order search on stateTree
  // To compute the parents' scores
  // https://stackoverflow.com/a/20062584
  const postOrder = index => {
    stateTree.getChildren(index).forEach(postOrder)

    const store = stateTree.getData(index)
    const childrenStores = stateTree.getChildrenData(index) // TODO transform O(n) into O(1)
    
    if (!childrenStores.length) {
      return 
    }
    
    // Determining the node type based on the team the faction it represents is on
    const nodeTypeFn = consideredFaction.team === store.getState().currentFaction.team ? Math.max : Math.min
    
    store.score = nodeTypeFn(...childrenStores.map(store => store.score))
  }

  postOrder(rootStore.stateTreeIndex)

  // We select the root's child with the highest score
  const childrenStores = stateTree.getChildrenData(rootStore.stateTreeIndex)

  // If the root state has no viable children we return no actions to take
  if (!childrenStores.length) return []

  const selectedChildStore = childrenStores.sort((a, b) => a.score > b.score ? -1 : 1)[0]

  // console.log('stateTree', stateTree)

  return selectedChildStore.actions
}

// Add children for a given parent to the state tree
function extendStateTree(stateTree, parentStore, consideredFaction, maxDepth, depth = 0) {
  // Goes recursively as deep as maxDepth
  if (depth > maxDepth) return

  console.log('depth', depth, parentStore.getState().currentFaction.id)

  const parentWorldState = parentStore.getState()
  
  // First we heuristically compute all possible actions to take
  // This will return an array of possible actions per unit
  // eg: [[a, b], [c, d, e]] for two units
  const possibleActions = expandPossibleActions(parentStore)
  // Then we combine them into lots of possible actions for all units
  // They will all lead to a different child world state
  // eg: [ac, ad, ae, bc, bd, be]
  const actionsCombinaisons = combineArrayItems(possibleActions)
  
  console.log('possibleActions', possibleActions)
  // console.log('actionsCombinaisons', actionsCombinaisons)

  // We create a store for each combinaison
  const stores = []

  actionsCombinaisons.forEach((actions, i) => {

    const store = createAiStore(parentWorldState)
    
    // We feed our actions to the store
    try {
      actions.forEach(store.dispatch)
    }
    // Sometimes the action is impossible (some units are on the same position, the defender is dead, ...)
    catch (error) {
      return
    }

    store.dispatch({ type: 'END_PLAYER_TURN' })
    store.dispatch({ type: 'BEGIN_PLAYER_TURN' })
    
    store.actions = actions
    store.score = computeWorldStateScore(store)[consideredFaction.id]

    stores.push(store)
  })

  console.log(possibleActions.length, actionsCombinaisons.length, stores.length)

  stores
    // We sort the stores by score and take the first maxBranchingFactor
    .sort((a, b) => a.score > b.score ? -1 : 1)
    .forEach((store, i) => {
      if (i >= maxBranchingFactor) return

      // We add the store to the state tree
      stateTree.addNode(store, parentStore.stateTreeIndex)

      // We go deeper in extending our children
      extendStateTree(stateTree, store, consideredFaction, maxDepth, depth + 1)
    })
}

// transforms [[a, b], [c, d, e]] into [ac, ad, ae, bc, bd, be]
// Where a is an array and ac is an array containing the elements of a and c
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

// For a given parent world state, provide the actions per unit 
// that will lead to another world state.
function expandPossibleActions(store) {
  const { units, currentFaction } = store.getState()

  // The heuristic here is to determine nTargets targets per unit
  // The target can either be a 'FIRE' or 'CAPTURE' type
  // The target's metadata will then be a ennemy unit or building
  const possibleUnitTargets = []

  // For each unit, determine a unit or building target
  units.forEach(unit => {
    if (unit.factionId !== currentFaction.id) return

    possibleUnitTargets.push([unit, computePossibleTarget(store, unit)])
  })

  console.log('possibleUnitTargets', possibleUnitTargets)

  // Then for each target, we compute the associated actions
  // ie. we need to compute the shortest path to the target
  // and advance as much as possible on this path limited by the unit's movement.
  // A target will correspond to at least two actions (eg: 'FIRE', 'PLAY_UNIT')

  // An array of actions
  const possibleUnitActions = []

  possibleUnitTargets.forEach(([unit, targets]) => {
    // Dedupe actions
    const serializedActions = new Set()

    targets.forEach(target => {
      serializedActions.add(JSON.stringify(transformTargetIntoActions(store, unit, target)))
    })

    const actions = []

    // dedupe actions
    serializedActions.forEach(serializedAction => actions.push(JSON.parse(serializedAction)))

    if (actions.length) possibleUnitActions.push(actions)
  })

  return possibleUnitActions
}

// Uniform cost search to look for possible targets
// Will expand from the unit's position to every position on the map
// until nTargets are found
function computePossibleTarget(store, unit) {
  const { units, buildings } = store.getState()
  const unitConfiguration = gameConfiguration.unitsConfiguration[unit.type]
  
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
    if (units.some(u => u.id !== unit.id && samePosition(u.position, position))) continue

    // We look for potential ennemies on range to attack
    const rangePositions = computeRangePositions(store, unit, position)

    units.forEach(u => {
      const potentialDamages = unitConfiguration.damages[u.type]

      if (
        u.team !== unit.team &&                                                // If a unit from opposite team
        rangePositions.some(position => samePosition(position, u.position)) && // is on range at position
        potentialDamages                                                       // and can take damages
      ) {
        // The target's score here is the ennemy's distance divided by the potential damages
        // We want the smalled cost possible
        targets.push(['FIRE', u.id, position, cost / potentialDamages])
      }
    })

    // Infantery type can also capture building, we add that action to the list if a building is on the position
    if (unit.type === 'INFANTERY') {
      const buidling = buildings.find(building => samePosition(position, building.position))

      if (buidling && buidling.team !== unit.team) {
        const costDivider = buidling.team ? 110 : 100 // priorities opposite team capture

        targets.push(['CAPTURE', buidling.id, position, cost / costDivider])
      }
    }

    // If we reach the goal number of targets we stop the computation
    if (targets.length >= nTargets) break

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

  // Return targets sorted by cost
  return targets.sort((a, b) => a[2] < b[2] ? -1 : 1)
}

function transformTargetIntoActions(store, unit, target) {
  const { buildings } = store.getState()
  const [type, targetId, position] = target
  
  const pathToTarget = aStarSearch(store, unit, unit.position, position) 
  const possibleMovementPositions = computeMovementPositions(store, unit)
  
  const extremePosition = pathToTarget.reverse().find(position => position === unit.position || possibleMovementPositions.some(p => samePosition(p, position)))

  // console.log(target, pathToTarget, extremePosition)

  const actions = []
  let unitIdDead = false

  if (extremePosition) {
    if (!samePosition(unit.position, extremePosition)) {
      actions.push({
        type: 'MOVE_UNIT',
        payload: {
          unitId: unit.id,
          position: extremePosition,
        },
      })
    }

    if (samePosition(extremePosition, position)) {
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

  path.unshift(startPosition)

  return path
}

export default computeAiActions