const gameConfiguration = {
  moneyPerCityPerTurn: 1000,
  viewBoxIntervalPeriod: 1000 / 60, // 17ms period = 60 iterations per seconds frequency
  viewBoxIncrements: 5, // The viewBox will move nIncrements times each time it has changed
  buildingTerrains: ['HEADQUARTERS', 'CITY', 'BASE', 'AIRPORT', 'PORT'],
  terrainConfiguration: {
    PLAIN: {
      name: 'Plain',
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
      name: 'Road',
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
      name: 'Forest',
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
      name: 'Mountain',
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
      name: 'River',
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
      name: 'Sea',
      color: '#2032a3',
      defense: 0,
      movementCost: {
        FOOT: Infinity,
        WHEEL: Infinity,
        FLY: 1,
        SAIL: 1,
      },
    },
    HEADQUARTERS: {
      name: 'HQ',
      color: '#c1c1c1',
      defense: 3,
      movementCost: {
        FOOT: 1,
        WHEEL: 1,
        FLY: 1,
        SAIL: Infinity,
      },
    },
    CITY: {
      name: 'City',
      color: '#c1c1c1',
      defense: 3,
      movementCost: {
        FOOT: 1,
        WHEEL: 1,
        FLY: 1,
        SAIL: Infinity,
      },
    },
    BASE: {
      name: 'Base',
      color: '#c1c1c1',
      defense: 3,
      movementCost: {
        FOOT: 1,
        WHEEL: 1,
        FLY: 1,
        SAIL: Infinity,
      },
    },
    AIRPORT: {
      name: 'Airport',
      color: '#c1c1c1',
      defense: 3,
      movementCost: {
        FOOT: 1,
        WHEEL: 1,
        FLY: 1,
        SAIL: Infinity,
      },
    },
    PORT: {
      name: 'Port',
      color: '#c1c1c1',
      defense: 3,
      movementCost: {
        FOOT: 1,
        WHEEL: 1,
        FLY: 1,
        SAIL: 1,
      },
    },
  },
  unitsConfiguration: {
    INFANTERY: {
      name: 'Infantery',
      movementType: 'FOOT',
      movement: 3,
      range: [1, 1],
      cost: 1000,
      damages: {
        INFANTERY: 55,
        TANK: 5,
        ARTILLERY: 15,
      },
    },
    TANK: {
      name: 'Tank',
      movementType: 'WHEEL',
      movement: 6,
      range: [1, 1],
      cost: 7000,
      damages: {
        INFANTERY: 75,
        TANK: 55,
        ARTILLERY: 70,
      },
    },
    ARTILLERY: {
      name: 'Artillery',
      movementType: 'WHEEL',
      movement: 5,
      range: [2, 3],
      cost: 6000,
      damages: {
        INFANTERY: 90,
        TANK: 45,
        ARTILLERY: 75,
        SUBMARINE: 60,
      },
    },
    SUBMARINE: {
      name: 'Submarine',
      movementType: 'SAIL',
      movement: 5,
      range: [1, 1],
      cost: 20000,
      damages: {
        SUBMARINE: 60,
      },
    },
  },
  buildingsConfiguration: {
    HEADQUARTERS: {
      name: 'HQ',
      reparableMovementTypes: ['FOOT', 'WHEEL'],
    },
    CITY: {
      name: 'City',
      reparableMovementTypes: ['FOOT', 'WHEEL'],
    },
    BASE: {
      name: 'Base',
      reparableMovementTypes: ['FOOT', 'WHEEL'],
    },
    PORT: {
      name: 'Port',
      reparableMovementTypes: ['SAIL'],
    },
    AIRPORT: {
      name: 'Airport',
      reparableMovementTypes: ['FLY'],
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
    YELLOW: {
      name: 'Yellow Nation',
      color: '#ffe500',
    },
  },
}

// Assign a "power" metric to each unit type
Object.values(gameConfiguration.unitsConfiguration).forEach(unitConfiguration => {
  unitConfiguration.power = Object.values(unitConfiguration.damages).reduce((a, b) => a + b, 0)
})

export default gameConfiguration
