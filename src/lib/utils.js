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
