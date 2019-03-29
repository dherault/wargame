const gameConfiguration = {
  viewBoxIntervalPeriod: 1000 / 60, // 17ms period = 60 iterations per seconds frequency
  viewBoxIncrements: 5, // The viewBox will move nIncrements times each time it has changed
  moneyPerCityPerTurn: 1000,
  unitMovementPeriod: 17,
  unitMovementIncrement: 0.05,
  buildingTerrainTypes: ['HEADQUARTERS', 'CITY', 'BASE', 'AIRPORT', 'PORT'],
  creationBuildingTypes: ['BASE', 'AIRPORT', 'PORT'],
  infanteryUnitTypes: ['INFANTERY', 'MECH'],
  hideoutTerrainTypes: ['FOREST', 'REEF'],
  infanteryVisionBonusOnMountains: 3,
  imageSources: {
    units: '/images/units.png',
    playedUnits: '/images/units_played.png',
    campaignMenuBackground: '/images/map_remastered.png',
    campaignMenuSwords: '/images/swords_64x64.png',
  },
  imageDimensions: {
    campaignMenuBackground: {
      width: 4096,
      height: 2048,
    },
  },
  terrainConfiguration: {
    PLAIN: {
      name: 'Plain',
      color: '#047a02',
      defense: 1,
      movementCost: {
        FOOT: 1, 
        WHEEL: 2, 
        THREAD: 1,
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
        THREAD: 1,
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
        THREAD: 3,
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
        THREAD: Infinity,
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
        THREAD: Infinity,
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
        THREAD: Infinity,
        FLY: 1,
        SAIL: 1,
      },
    },
    REEF: {
      name: 'Reefs',
      color: '#15247f',
      defense: 2,
      movementCost: {
        FOOT: Infinity,
        WHEEL: Infinity,
        THREAD: Infinity,
        FLY: 1,
        SAIL: 2,
      },
    },
    HEADQUARTERS: {
      name: 'HQ',
      color: '#c1c1c1',
      defense: 3,
      movementCost: {
        FOOT: 1,
        WHEEL: 1,
        THREAD: 1,
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
        THREAD: 1,
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
        THREAD: 1,
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
        THREAD: 1,
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
        THREAD: 1,
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
      vision: 2,
      cost: 1000,
      damages: {
        INFANTERY: 55,
        MECH: 45,
        RECON: 12,
        TANK: 5,
        HEAVY_TANK: 1,
        NEO_TANK: 1,
        ARMORED_PERSONNEL_CARRIER: 14,
        ARTILLERY: 15,
        ROCKET_LAUNCHER: 25,
        ANTI_AIR_TANK: 5,
        ANTI_AIR_MISSILE_LAUNCHER: 25,
        BATTLE_HELICOPTER: 7,
        TRANSPORT_HELICOPTER: 30,
      },
      unitsImageDx: 0,
      unitsImageDy: 0,
    },
    MECH: {
      name: 'Mechanized Infantery',
      movementType: 'FOOT',
      movement: 3,
      range: [1, 1],
      vision: 2,
      cost: 3000, 
      damages: {
        INFANTERY: 65,
        MECH: 55,
        RECON: 85,
        TANK: 55,
        HEAVY_TANK: 15,
        NEO_TANK: 15,
        ARMORED_PERSONNEL_CARRIER: 75,
        ARTILLERY: 70,
        ROCKET_LAUNCHER: 85,
        ANTI_AIR_TANK: 65,
        ANTI_AIR_MISSILE_LAUNCHER: 85,
        BATTLE_HELICOPTER: 9,
        TRANSPORT_HELICOPTER: 35,
      },
      unitsImageDx: 68,
      unitsImageDy: 0,
    },
    RECON: {
      name: 'Recon',
      movementType: 'WHEEL',
      movement: 8,
      range: [1, 1],
      vision: 5,
      cost: 3500, 
      damages: {
        INFANTERY: 70,
        MECH: 65,
        RECON: 35,
        TANK: 6,
        HEAVY_TANK: 1,
        NEO_TANK: 1,
        ARMORED_PERSONNEL_CARRIER: 45,
        ARTILLERY: 45,
        ROCKET_LAUNCHER: 55,
        ANTI_AIR_TANK: 4,
        ANTI_AIR_MISSILE_LAUNCHER: 28,
        BATTLE_HELICOPTER: 10,
        TRANSPORT_HELICOPTER: 35,
      },
      unitsImageDx: 135,
      unitsImageDy: 0,
    },
    TANK: {
      name: 'Tank',
      movementType: 'THREAD',
      movement: 6,
      range: [1, 1],
      vision: 3,
      cost: 7000,
      damages: {
        INFANTERY: 75,
        MECH: 70,
        RECON: 40,
        TANK: 55,
        HEAVY_TANK: 15,
        NEO_TANK: 15,
        ARMORED_PERSONNEL_CARRIER: 75,
        ARTILLERY: 70,
        ROCKET_LAUNCHER: 85,
        ANTI_AIR_TANK: 65,
        ANTI_AIR_MISSILE_LAUNCHER: 85,
        BATTLE_HELICOPTER: 10,
        TRANSPORT_HELICOPTER: 40,
        BATTLESHIP: 1,
        CRUISER: 5,
        LANDER: 10,
        SUBMARINE: 1,
      },
      unitsImageDx: 202,
      unitsImageDy: 0,
    },
    HEAVY_TANK: {
      name: 'Heavy Tank',
      movementType: 'THREAD',
      movement: 5,
      range: [1, 1],
      vision: 1,
      cost: 16000,
      damages: {
        INFANTERY: 105,
        MECH: 95,
        RECON: 105,
        TANK: 85,
        HEAVY_TANK: 55,
        NEO_TANK: 45,
        ARMORED_PERSONNEL_CARRIER: 105,
        ARTILLERY: 105,
        ROCKET_LAUNCHER: 105,
        ANTI_AIR_TANK: 105,
        ANTI_AIR_MISSILE_LAUNCHER: 105,
        BATTLE_HELICOPTER: 12,
        TRANSPORT_HELICOPTER: 45,
        BATTLESHIP: 10,
        CRUISER: 45,
        LANDER: 35,
        SUBMARINE: 10,
      },
      unitsImageDx: 269,
      unitsImageDy: 0,
    },
    NEO_TANK: {
      name: 'Neo Tank',
      movementType: 'THREAD',
      movement: 6,
      range: [1, 1],
      vision: 1,
      cost: 22000,
      damages: {
        INFANTERY: 125,
        MECH: 115,
        RECON: 125,
        TANK: 105,
        HEAVY_TANK: 75,
        NEO_TANK: 55,
        ARMORED_PERSONNEL_CARRIER: 125,
        ARTILLERY: 115,
        ROCKET_LAUNCHER: 125,
        ANTI_AIR_TANK: 115,
        ANTI_AIR_MISSILE_LAUNCHER: 125,
        BATTLE_HELICOPTER: 22,
        TRANSPORT_HELICOPTER: 55,
        BATTLESHIP: 15,
        CRUISER: 50,
        LANDER: 40,
        SUBMARINE: 15,
      },
      unitsImageDx: 336,
      unitsImageDy: 0,
    },
    ARMORED_PERSONNEL_CARRIER: {
      name: 'Armored Personnel Carrier',
      movementType: 'WHEEL',
      movement: 6,
      range: [0, 0],
      vision: 1,
      cost: 5000,
      damages: {},
      unitsImageDx: 469,
      unitsImageDy: 0,
    },
    ARTILLERY: {
      name: 'Artillery',
      movementType: 'THREAD',
      movement: 5,
      range: [2, 3],
      vision: 1,
      cost: 6000,
      damages: {
        INFANTERY: 90,
        MECH: 85,
        RECON: 80,
        TANK: 70,
        HEAVY_TANK: 45,
        NEO_TANK: 40,
        ARMORED_PERSONNEL_CARRIER: 70,
        ARTILLERY: 75,
        ROCKET_LAUNCHER: 80,
        ANTI_AIR_TANK: 75,
        ANTI_AIR_MISSILE_LAUNCHER: 80,
        BATTLESHIP: 40,
        CRUISER: 35,
        LANDER: 55,
        SUBMARINE: 60,
      },
      unitsImageDx: 536,
      unitsImageDy: 0,
    },
    ROCKET_LAUNCHER: {
      name: 'Rocket Launcher',
      movementType: 'WHEEL',
      movement: 5,
      range: [3, 5],
      vision: 1,
      cost: 15000,
      damages: {
        INFANTERY: 95,
        MECH: 90,
        RECON: 90,
        TANK: 80,
        HEAVY_TANK: 55,
        NEO_TANK: 50,
        ARMORED_PERSONNEL_CARRIER: 80,
        ARTILLERY: 80,
        ROCKET_LAUNCHER: 85,
        ANTI_AIR_TANK: 85,
        ANTI_AIR_MISSILE_LAUNCHER: 90,
        BATTLESHIP: 55,
        CRUISER: 85,
        LANDER: 60,
        SUBMARINE: 85,
      },
      unitsImageDx: 603,
      unitsImageDy: 0,
    },
    ANTI_AIR_TANK: {
      name: 'Anti-air Tank',
      movementType: 'THREAD',
      movement: 6,
      range: [1, 1],
      vision: 2,
      cost: 8000,
      damages: {
        INFANTERY: 105,
        MECH: 105,
        RECON: 60,
        TANK: 25,
        HEAVY_TANK: 10,
        NEO_TANK: 5,
        ARMORED_PERSONNEL_CARRIER: 50,
        ARTILLERY: 50,
        ROCKET_LAUNCHER: 55,
        ANTI_AIR_TANK: 45,
        ANTI_AIR_MISSILE_LAUNCHER: 55,
        FIGHTER: 65,
        BOMBER: 75,
        BATTLE_HELICOPTER: 120,
        TRANSPORT_HELICOPTER: 120,
      },
      unitsImageDx: 670,
      unitsImageDy: 0,
    },
    ANTI_AIR_MISSILE_LAUNCHER: {
      name: 'Anti-air Missile Launcher',
      movementType: 'WHEEL',
      movement: 4,
      range: [2, 3],
      vision: 5,
      cost: 12000,
      damages: {
        FIGHTER: 100,
        BOMBER: 100,
        BATTLE_HELICOPTER: 120,
        TRANSPORT_HELICOPTER: 120,
      },
      unitsImageDx: 737,
      unitsImageDy: 0,
    },
    FIGHTER: {
      name: 'Fighter',
      movementType: 'FLY',
      movement: 9,
      range: [1, 1],
      vision: 2,
      cost: 20000,
      damages: {
        FIGHTER: 55,
        BOMBER: 100,
        BATTLE_HELICOPTER: 100,
        TRANSPORT_HELICOPTER: 100,
      },
      unitsImageDx: 0,
      unitsImageDy: 66,
    },
    BOMBER: {
      name: 'Bomber',
      movementType: 'FLY',
      movement: 7,
      range: [1, 1],
      vision: 2,
      cost: 22000,
      damages: {
        INFANTERY: 110,
        MECH: 110,
        RECON: 105,
        TANK: 105,
        HEAVY_TANK: 95,
        NEO_TANK: 90,
        ARMORED_PERSONNEL_CARRIER: 105,
        ARTILLERY: 105,
        ROCKET_LAUNCHER: 105,
        ANTI_AIR_TANK: 95,
        ANTI_AIR_MISSILE_LAUNCHER: 105,
        BATTLESHIP: 75,
        CRUISER: 85,
        LANDER: 95,
        SUBMARINE: 95,
      },
      unitsImageDx: 67,
      unitsImageDy: 66,
    },
    BATTLE_HELICOPTER: {
      name: 'Battle Helicopter',
      movementType: 'FLY',
      movement: 6,
      range: [1, 1],
      vision: 3,
      cost: 9000,
      damages: {
        INFANTERY: 75,
        MECH: 75,
        RECON: 55,
        TANK: 55,
        HEAVY_TANK: 25,
        NEO_TANK: 20,
        ARMORED_PERSONNEL_CARRIER: 60,
        ARTILLERY: 65,
        ROCKET_LAUNCHER: 65,
        ANTI_AIR_TANK: 25,
        ANTI_AIR_MISSILE_LAUNCHER: 65,
        BATTLE_HELICOPTER: 65,
        TRANSPORT_HELICOPTER: 95,
        BATTLESHIP: 25,
        CRUISER: 55,
        LANDER: 25,
        SUBMARINE: 25,
      },
      unitsImageDx: 134,
      unitsImageDy: 66,
    },
    TRANSPORT_HELICOPTER: {
      name: 'Transport Helicopter',
      movementType: 'FLY',
      movement: 6,
      range: [0, 0],
      vision: 2,
      cost: 5000,
      damages: {},
      unitsImageDx: 202,
      unitsImageDy: 66,
    },
    BATTLESHIP: {
      name: 'Battleship',
      movementType: 'SAIL',
      movement: 5,
      range: [2, 6],
      vision: 2,
      cost: 28000,
      damages: {
        INFANTERY: 95,
        MECH: 90,
        RECON: 90,
        TANK: 80,
        HEAVY_TANK: 55,
        NEO_TANK: 50,
        ARMORED_PERSONNEL_CARRIER: 80,
        ARTILLERY: 80,
        ROCKET_LAUNCHER: 85,
        ANTI_AIR_TANK: 85,
        ANTI_AIR_MISSILE_LAUNCHER: 90,
        BATTLESHIP: 50,
        CRUISER: 95,
        LANDER: 95,
        SUBMARINE: 95,
      },
      unitsImageDx: 402,
      unitsImageDy: 66,
    },
    CRUISER: {
      name: 'Cruiser',
      movementType: 'SAIL',
      movement: 6,
      range: [1, 1],
      vision: 3,
      cost: 18000,
      damages: {
        FIGHTER: 55,
        BOMBER: 65,
        BATTLE_HELICOPTER: 115,
        TRANSPORT_HELICOPTER: 115,
        SUBMARINE: 90,
      },
      unitsImageDx: 469,
      unitsImageDy: 66,
    },
    LANDER: {
      name: 'Lander',
      movementType: 'SAIL',
      movement: 6,
      range: [0, 0],
      vision: 1,
      cost: 12000,
      damages: {},
      unitsImageDx: 536,
      unitsImageDy: 66,
    },
    SUBMARINE: {
      name: 'Submarine',
      movementType: 'SAIL',
      movement: 5,
      range: [1, 1],
      vision: 5,
      cost: 20000,
      damages: {
        BATTLESHIP: 55,
        CRUISER: 25,
        LANDER: 95,
        SUBMARINE: 55,
      },
      unitsImageDx: 604,
      unitsImageDy: 66,
    },
  },
  buildingsConfiguration: {
    HEADQUARTERS: {
      name: 'HQ',
      reparableMovementTypes: ['FOOT', 'WHEEL', 'THREAD'],
      creatableUnitMovementTypes: [],
    },
    CITY: {
      name: 'City',
      reparableMovementTypes: ['FOOT', 'WHEEL', 'THREAD'],
      creatableUnitMovementTypes: [],
    },
    BASE: {
      name: 'Base',
      reparableMovementTypes: ['FOOT', 'WHEEL', 'THREAD'],
      creatableUnitMovementTypes: ['FOOT', 'WHEEL', 'THREAD'],
    },
    PORT: {
      name: 'Port',
      reparableMovementTypes: ['SAIL'],
      creatableUnitMovementTypes: ['SAIL'],
    },
    AIRPORT: {
      name: 'Airport',
      reparableMovementTypes: ['FLY'],
      creatableUnitMovementTypes: ['FLY'],
    },
  },
  factionsConfiguration: {
    RED: {
      name: 'Red Nation',
      color: '#d61919',
      unitsImageDy: 0,
    },
    BLUE: {
      name: 'Blue Nation',
      color: '#4286f4',
      unitsImageDy: 132,
    },
    YELLOW: {
      name: 'Yellow Nation',
      color: '#ffe500',
      unitsImageDy: 396,
    },
    GREEN: {
      name: 'Green Nation',
      color: '#3d9134',
      unitsImageDy: 264,
    },
  },
}

// Assign a "power" metric to each unit type
// See computeWorldStateScore.js
Object.values(gameConfiguration.unitsConfiguration).forEach(unitConfiguration => {
  unitConfiguration.power = Object.values(unitConfiguration.damages).reduce((a, b) => a + b, 0)
})

export default gameConfiguration
