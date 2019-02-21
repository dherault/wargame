export function chance(probability) {
  return Math.random() > 1 - probability
}

export function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomPop(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0]
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
  return Math.random().toString().slice(2)
}