import uuid from 'uuid'
/*
  Utils make non-domain logic DRY
*/

export function chance(probability) {
  return Math.random() > 1 - probability
}

export function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function randomArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomPop(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0]
}

export function randomSlice(array, n) {
  const result = []

  for (let i = 0; i < n; i++) {
    const item = randomPop(array)

    if (typeof item !== 'undefined') {
      result.push(item)
    }
    else {
      break
    }
  }

  return result
}

export function cloneArrayOfObjects(array) {
  return array.map(object => Object.assign({}, object))
}

export function samePosition(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y
}

export function findById(array, id) {
  return array.find(item => item.id === id)
}

export function createId() {
  return uuid.v4()
}

export function hash(position) {
  return `${position.x}_${position.y}`
}

export function unhash(positionHash) {
  const [x, y] = positionHash.split('_')

  return {
    x: parseInt(x),
    y: parseInt(y),
  }
}

export function hashPositionAndDistance(position, distance = 0) {
  return `${position.x}_${position.y}_${distance}`
}

export function unhashPositionAndDistance(string) {
  const [x, y, distance] = string.split('_')

  return [{ x: parseInt(x), y: parseInt(y) }, parseInt(distance)]
}

export function round(x, decimal) {
  const pow = 10 ** decimal

  return Math.round(x * pow) / pow
}

export function manhattanDistance(p1, p2) {
  return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y)
}

export function euclidianDistance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y))
}

export function throttle(fn, delay) {
  let timeoutId

  return () => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(fn, delay)
  }
}

// transforms [[a, b], [c, d, e]] into [[a, c], [a, d], [a, e], [b, c], [b, d], [b, e]]
// Where a is an array
// https://stackoverflow.com/a/4331218
// LEGACY CODE
export function combineArrayItems(array) {
  if (array.length === 0) {
    return []
  }
  if (array.length === 1) {
    return array[0].map(item => [item])
  }

  const result = []
  const recursiveCombinaisons = combineArrayItems(array.slice(1)) // Recur with the rest of array

  for (let i = 0; i < array[0].length; i++) {
    for (let j = 0; j < recursiveCombinaisons.length; j++) {
      result.push([array[0][i], ...recursiveCombinaisons[j]])
    }
  }

  return result
}
