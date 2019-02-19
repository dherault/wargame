export default {
  tilesConfiguration: {
    GRASS: {
      name: 'grass',
      color: '#047a02',
      movementCost: {
        FOOT: 1, 
        WHEEL: 2, 
        FLY: 1, 
        SAIL: Infinity,
      }, 
    },
    ROAD: {
      name: 'road',
      color: '#e0dac9',
      movementCost: {
        FOOT: 1, 
        WHEEL: 1, 
        FLY: 1, 
        SAIL: Infinity,
      }, 
    },
    FOREST: {
      name: 'forest',
      color: '#014c00',
      movementCost: {
        FOOT: 2, 
        WHEEL: Infinity, 
        FLY: 1, 
        SAIL: Infinity,
      }, 
    },
    MOUNTAIN: {
      name: 'mountain',
      color: '#a5a195',
      movementCost: {
        FOOT: 3, 
        WHEEL: Infinity,
        FLY: 1,
        SAIL: Infinity,
      }, 
    },
    RIVER: {
      name: 'river',
      color: '#57def9',
      movementCost: {
        FOOT: 2, 
        WHEEL: Infinity,
        FLY: 1,
        SAIL: Infinity,
      }, 
    },
    SEA: {
      name: 'sea',
      color: '#2032a3',
      movementCost: {
        FOOT: Infinity,
        WHEEL: Infinity,
        FLY: 1,
        SAIL:  1,
      },
    },
  },
  unitsConfiguration: {
    INFANTERY: {
      name: 'infantery',
      movementType: 'FOOT',
      movement: 3,
      range: [1, 1],
      damages: {
        INFANTERY: 50,
        TANK: 10,
      },
    },
    TANK: {
      name: 'tank',
      movementType: 'WHEEL',
      movement: 6,
      range: [1, 1],
      damages: {
        INFANTERY: 80,
        TANK: 50,
      },
    },
    ARTILLERY: {
      name: 'artillery',
      movementType: 'WHEEL',
      movement: 5,
      range: [2, 3],
      damages: {
        INFANTERY: 70,
        TANK: 60,
      },
    },
  },
  factionsConfiguration: {
    BLUE: {
      name: 'Blue Nation',
      color: '#4286f4',
    },
    RED: {
      name: 'Red Nation',
      color: '#d61919',
    },
  },
}
