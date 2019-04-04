const fakeInitialState = {
  leftBackgroundTileOffset: { // TODO: replace with leftUnit.position --> tile --> terrain --> offset
    x: 2,
    y: 4,
  },
  rightBackgroundTileOffset: {
    x: 2 + 2 + 128,
    y: 4 + 2 + 168,
  },
  leftUnit: {
    life: 100,
    type: 'INFANTERY',
    factionId: 'RED',
  },
  rightUnit: {
    life: 100,
    type: 'TANK',
    factionId: 'BLUE',
  },
  firstAttacker: 'left',
  damages: [10, 49],
  step: 'MOVE',
}

function attackAnimationParameters(state = null, action) {

  return fakeInitialState
}

export default attackAnimationParameters
