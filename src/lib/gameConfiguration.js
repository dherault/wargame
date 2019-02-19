export default {
  terrainConfiguration: {
    GRASS: {
      name: 'grass',
      color: '#047a02',
      defense: 1,
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
      defense: 0,
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
      defense: 2,
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
      defense: 4,
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
      defense: 0,
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
      defense: 0,
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
        INFANTERY: 55,
        TANK: 5,
        ARTILLERY: 15,
      },
    },
    TANK: {
      name: 'tank',
      movementType: 'WHEEL',
      movement: 6,
      range: [1, 1],
      damages: {
        INFANTERY: 75,
        TANK: 55,
        ARTILLERY: 70,
      },
    },
    ARTILLERY: {
      name: 'artillery',
      movementType: 'WHEEL',
      movement: 5,
      range: [2, 3],
      damages: {
        INFANTERY: 90,
        TANK: 45,
        ARTILLERY: 75,
        SUBMARINE: 60,
      },
    },
    SUBMARINE: {
      name: 'submarine',
      movementType: 'SAIL',
      movement: 5,
      range: [1, 1],
      damages: {
        SUBMARINE: 60,
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
