function showOff() {
  return {
    worldMap: [
      [
        'SEA',
        'SEA',
        'SEA',
        'PORT',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PORT',
        'SEA',
        'SEA',
        'SEA',
      ],
      [
        'SEA',
        'HEADQUARTERS',
        'PLAIN',
        'AIRPORT',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'AIRPORT',
        'PLAIN',
        'HEADQUARTERS',
        'SEA',
      ],
      [
        'SEA',
        'PLAIN',
        'CITY',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'CITY',
        'PLAIN',
        'SEA',
      ],
      [
        'PLAIN',
        'BASE',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'BASE',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'BASE',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'BASE',
        'PLAIN',
      ],
      [
        'SEA',
        'PLAIN',
        'CITY',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'CITY',
        'PLAIN',
        'SEA',
      ],
      [
        'SEA',
        'HEADQUARTERS',
        'PLAIN',
        'AIRPORT',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'AIRPORT',
        'PLAIN',
        'HEADQUARTERS',
        'SEA',
      ],
      [
        'SEA',
        'SEA',
        'SEA',
        'PORT',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PORT',
        'SEA',
        'SEA',
        'SEA',
      ],
    ],
    factions: [
      {
        id: 'BLUE',
        type: 'HUMAN',
        team: 1,
      },
      {
        id: 'RED',
        type: 'HUMAN',
        team: 2,
      },
      {
        id: 'YELLOW',
        type: 'HUMAN',
        team: 3,
      },
      {
        id: 'GREEN',
        type: 'HUMAN',
        team: 4,
      },
    ],
    buildings: [
      {
        type: 'HEADQUARTERS',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 1,
        },
      },
      {
        type: 'PORT',
        factionId: 'BLUE',
        position: {
          x: 3,
          y: 0,
        },
      },
      {
        type: 'CITY',
        factionId: 'BLUE',
        position: {
          x: 2,
          y: 2,
        },
      },
      {
        type: 'BASE',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 3,
        },
      },
      {
        type: 'AIRPORT',
        factionId: 'BLUE',
        position: {
          x: 3,
          y: 1,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'RED',
        position: {
          x: 10,
          y: 1,
        },
      },
      {
        type: 'CITY',
        factionId: 'RED',
        position: {
          x: 9,
          y: 2,
        },
      },
      {
        type: 'BASE',
        factionId: 'RED',
        position: {
          x: 10,
          y: 3,
        },
      },
      {
        type: 'PORT',
        factionId: 'RED',
        position: {
          x: 8,
          y: 0,
        },
      },
      {
        type: 'AIRPORT',
        factionId: 'RED',
        position: {
          x: 8,
          y: 1,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'YELLOW',
        position: {
          x: 10,
          y: 10,
        },
      },
      {
        type: 'CITY',
        factionId: 'YELLOW',
        position: {
          x: 9,
          y: 9,
        },
      },
      {
        type: 'BASE',
        factionId: 'YELLOW',
        position: {
          x: 10,
          y: 8,
        },
      },
      {
        type: 'PORT',
        factionId: 'YELLOW',
        position: {
          x: 8,
          y: 11,
        },
      },
      {
        type: 'AIRPORT',
        factionId: 'YELLOW',
        position: {
          x: 8,
          y: 10,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'GREEN',
        position: {
          x: 1,
          y: 10,
        },
      },
      {
        type: 'CITY',
        factionId: 'GREEN',
        position: {
          x: 2,
          y: 9,
        },
      },
      {
        type: 'BASE',
        factionId: 'GREEN',
        position: {
          x: 1,
          y: 8,
        },
      },
      {
        type: 'PORT',
        factionId: 'GREEN',
        position: {
          x: 3,
          y: 11,
        },
      },
      {
        type: 'AIRPORT',
        factionId: 'GREEN',
        position: {
          x: 3,
          y: 10,
        },
      },
    ],
    units: [
      {
        type: 'INFANTERY',
        factionId: 'BLUE',
        position: {
          x: 2,
          y: 1,
        },
      },
      {
        type: 'MECH',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 2,
        },
      },
      {
        type: 'RECON',
        factionId: 'BLUE',
        position: {
          x: 3,
          y: 2,
        },
      },
      {
        type: 'TANK',
        factionId: 'BLUE',
        position: {
          x: 2,
          y: 3,
        },
      },
      {
        type: 'HEAVY_TANK',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 4,
        },
      },
      {
        type: 'NEO_TANK',
        factionId: 'BLUE',
        position: {
          x: 0,
          y: 3,
        },
      },
      // {
      //   type: 'ARMORED_PERSONNEL_CARRIER',
      //   factionId: 'BLUE',
      //   position: {
      //     x: 0,
      //     y: 4,
      //   },
      // },
      {
        type: 'ARTILLERY',
        factionId: 'BLUE',
        position: {
          x: 2,
          y: 4,
        },
      },
      {
        type: 'ROCKET_LAUNCHER',
        factionId: 'BLUE',
        position: {
          x: 3,
          y: 3,
        },
      },
      {
        type: 'ANTI_AIR_TANK',
        factionId: 'BLUE',
        position: {
          x: 4,
          y: 2,
        },
      },
      {
        type: 'ANTI_AIR_MISSILE_LAUNCHER',
        factionId: 'BLUE',
        position: {
          x: 4,
          y: 1,
        },
      },
      {
        type: 'FIGHTER',
        factionId: 'BLUE',
        position: {
          x: 4,
          y: 0,
        },
      },
      {
        type: 'BOMBER',
        factionId: 'BLUE',
        position: {
          x: 0,
          y: 5,
        },
      },
      {
        type: 'BATTLE_HELICOPTER',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 5,
        },
      },
      // {
      //   type: 'TRANSPORT_HELICOPTER',
      //   factionId: 'BLUE',
      //   position: {
      //     x: 5,
      //     y: 0,
      //   },
      // },
      {
        type: 'BATTLESHIP',
        factionId: 'BLUE',
        position: {
          x: 0,
          y: 1,
        },
      },
      {
        type: 'CRUISER',
        factionId: 'BLUE',
        position: {
          x: 0,
          y: 2,
        },
      },
      // {
      //   type: 'LANDER',
      //   factionId: 'BLUE',
      //   position: {
      //     x: 0,
      //     y: 0,
      //   },
      // },
      {
        type: 'SUBMARINE',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 0,
        },
      },
      {
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 9,
          y: 1,
        },
      },
      {
        type: 'MECH',
        factionId: 'RED',
        position: {
          x: 10,
          y: 2,
        },
      },
      {
        type: 'RECON',
        factionId: 'RED',
        position: {
          x: 8,
          y: 2,
        },
      },
      {
        type: 'TANK',
        factionId: 'RED',
        position: {
          x: 9,
          y: 3,
        },
      },
      {
        type: 'HEAVY_TANK',
        factionId: 'RED',
        position: {
          x: 10,
          y: 4,
        },
      },
      {
        type: 'NEO_TANK',
        factionId: 'RED',
        position: {
          x: 11,
          y: 3,
        },
      },
      // {
      //   type: 'ARMORED_PERSONNEL_CARRIER',
      //   factionId: 'RED',
      //   position: {
      //     x: 11,
      //     y: 4,
      //   },
      // },
      {
        type: 'ARTILLERY',
        factionId: 'RED',
        position: {
          x: 9,
          y: 4,
        },
      },
      {
        type: 'ROCKET_LAUNCHER',
        factionId: 'RED',
        position: {
          x: 8,
          y: 3,
        },
      },
      {
        type: 'ANTI_AIR_TANK',
        factionId: 'RED',
        position: {
          x: 7,
          y: 2,
        },
      },
      {
        type: 'ANTI_AIR_MISSILE_LAUNCHER',
        factionId: 'RED',
        position: {
          x: 7,
          y: 1,
        },
      },
      {
        type: 'FIGHTER',
        factionId: 'RED',
        position: {
          x: 7,
          y: 0,
        },
      },
      {
        type: 'BOMBER',
        factionId: 'RED',
        position: {
          x: 11,
          y: 5,
        },
      },
      {
        type: 'BATTLE_HELICOPTER',
        factionId: 'RED',
        position: {
          x: 10,
          y: 5,
        },
      },
      // {
      //   type: 'TRANSPORT_HELICOPTER',
      //   factionId: 'RED',
      //   position: {
      //     x: 6,
      //     y: 0,
      //   },
      // },
      {
        type: 'BATTLESHIP',
        factionId: 'RED',
        position: {
          x: 11,
          y: 1,
        },
      },
      {
        type: 'CRUISER',
        factionId: 'RED',
        position: {
          x: 11,
          y: 2,
        },
      },
      // {
      //   type: 'LANDER',
      //   factionId: 'RED',
      //   position: {
      //     x: 11,
      //     y: 0,
      //   },
      // },
      {
        type: 'SUBMARINE',
        factionId: 'RED',
        position: {
          x: 10,
          y: 0,
        },
      },
      {
        type: 'RECON',
        factionId: 'YELLOW',
        position: {
          x: 8,
          y: 9,
        },
      },
      {
        type: 'TANK',
        factionId: 'YELLOW',
        position: {
          x: 9,
          y: 8,
        },
      },
      {
        type: 'HEAVY_TANK',
        factionId: 'YELLOW',
        position: {
          x: 10,
          y: 7,
        },
      },
      {
        type: 'NEO_TANK',
        factionId: 'YELLOW',
        position: {
          x: 11,
          y: 8,
        },
      },
      // {
      //   type: 'ARMORED_PERSONNEL_CARRIER',
      //   factionId: 'YELLOW',
      //   position: {
      //     x: 11,
      //     y: 7,
      //   },
      // },
      {
        type: 'ARTILLERY',
        factionId: 'YELLOW',
        position: {
          x: 9,
          y: 7,
        },
      },
      {
        type: 'ROCKET_LAUNCHER',
        factionId: 'YELLOW',
        position: {
          x: 8,
          y: 8,
        },
      },
      {
        type: 'ANTI_AIR_TANK',
        factionId: 'YELLOW',
        position: {
          x: 7,
          y: 9,
        },
      },
      {
        type: 'ANTI_AIR_MISSILE_LAUNCHER',
        factionId: 'YELLOW',
        position: {
          x: 7,
          y: 10,
        },
      },
      {
        type: 'FIGHTER',
        factionId: 'YELLOW',
        position: {
          x: 7,
          y: 11,
        },
      },
      {
        type: 'BOMBER',
        factionId: 'YELLOW',
        position: {
          x: 11,
          y: 6,
        },
      },
      {
        type: 'BATTLE_HELICOPTER',
        factionId: 'YELLOW',
        position: {
          x: 10,
          y: 6,
        },
      },
      // {
      //   type: 'TRANSPORT_HELICOPTER',
      //   factionId: 'YELLOW',
      //   position: {
      //     x: 6,
      //     y: 11,
      //   },
      // },
      {
        type: 'BATTLESHIP',
        factionId: 'YELLOW',
        position: {
          x: 11,
          y: 10,
        },
      },
      {
        type: 'CRUISER',
        factionId: 'YELLOW',
        position: {
          x: 11,
          y: 9,
        },
      },
      // {
      //   type: 'LANDER',
      //   factionId: 'YELLOW',
      //   position: {
      //     x: 11,
      //     y: 11,
      //   },
      // },
      {
        type: 'SUBMARINE',
        factionId: 'YELLOW',
        position: {
          x: 10,
          y: 11,
        },
      },
      {
        type: 'INFANTERY',
        factionId: 'YELLOW',
        position: {
          x: 9,
          y: 10,
        },
      },
      {
        type: 'MECH',
        factionId: 'YELLOW',
        position: {
          x: 10,
          y: 9,
        },
      },
      {
        type: 'INFANTERY',
        factionId: 'GREEN',
        position: {
          x: 2,
          y: 10,
        },
      },
      {
        type: 'MECH',
        factionId: 'GREEN',
        position: {
          x: 1,
          y: 9,
        },
      },
      {
        type: 'RECON',
        factionId: 'GREEN',
        position: {
          x: 3,
          y: 9,
        },
      },
      {
        type: 'TANK',
        factionId: 'GREEN',
        position: {
          x: 2,
          y: 8,
        },
      },
      {
        type: 'HEAVY_TANK',
        factionId: 'GREEN',
        position: {
          x: 1,
          y: 7,
        },
      },
      {
        type: 'NEO_TANK',
        factionId: 'GREEN',
        position: {
          x: 0,
          y: 8,
        },
      },
      // {
      //   type: 'ARMORED_PERSONNEL_CARRIER',
      //   factionId: 'GREEN',
      //   position: {
      //     x: 0,
      //     y: 7,
      //   },
      // },
      {
        type: 'ARTILLERY',
        factionId: 'GREEN',
        position: {
          x: 2,
          y: 7,
        },
      },
      {
        type: 'ROCKET_LAUNCHER',
        factionId: 'GREEN',
        position: {
          x: 3,
          y: 8,
        },
      },
      {
        type: 'ANTI_AIR_TANK',
        factionId: 'GREEN',
        position: {
          x: 4,
          y: 9,
        },
      },
      {
        type: 'ANTI_AIR_MISSILE_LAUNCHER',
        factionId: 'GREEN',
        position: {
          x: 4,
          y: 10,
        },
      },
      {
        type: 'FIGHTER',
        factionId: 'GREEN',
        position: {
          x: 4,
          y: 11,
        },
      },
      {
        type: 'BOMBER',
        factionId: 'GREEN',
        position: {
          x: 0,
          y: 6,
        },
      },
      {
        type: 'BATTLE_HELICOPTER',
        factionId: 'GREEN',
        position: {
          x: 1,
          y: 6,
        },
      },
      // {
      //   type: 'TRANSPORT_HELICOPTER',
      //   factionId: 'GREEN',
      //   position: {
      //     x: 5,
      //     y: 11,
      //   },
      // },
      {
        type: 'BATTLESHIP',
        factionId: 'GREEN',
        position: {
          x: 0,
          y: 10,
        },
      },
      {
        type: 'CRUISER',
        factionId: 'GREEN',
        position: {
          x: 0,
          y: 9,
        },
      },
      // {
      //   type: 'LANDER',
      //   factionId: 'GREEN',
      //   position: {
      //     x: 0,
      //     y: 11,
      //   },
      // },
      {
        type: 'SUBMARINE',
        factionId: 'GREEN',
        position: {
          x: 1,
          y: 11,
        },
      },
    ],
    name: 'Show off',
    description: 'Every unit is out',
  }
}

export default showOff
