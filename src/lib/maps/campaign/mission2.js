function mission2() {
  return {
    worldMap: [
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
        'HEADQUARTERS',
      ],
      [
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
      ],
      [
        'PLAIN',
        'PLAIN',
        'ROAD',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'CITY',
        'ROAD',
        'CITY',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'ROAD',
        'PLAIN',
        'PLAIN',
        'CITY',
        'PLAIN',
        'ROAD',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'ROAD',
        'PLAIN',
        'CITY',
        'PLAIN',
        'PLAIN',
        'ROAD',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'CITY',
        'ROAD',
        'CITY',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'ROAD',
        'PLAIN',
        'PLAIN',
      ],
      [
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
        'ROAD',
      ],
      [
        'HEADQUARTERS',
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
    ],
    factions: [
      {
        id: 'RED',
        type: 'HUMAN',
        team: 1,
      },
      {
        id: 'BLUE',
        type: 'COMPUTER',
        team: 2,
      },
    ],
    buildings: [
      {
        type: 'HEADQUARTERS',
        factionId: 'RED',
        position: {
          x: 0,
          y: 7,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'BLUE',
        position: {
          x: 9,
          y: 0,
        },
      },
      {
        type: 'CITY',
        factionId: 'RED',
        position: {
          x: 1,
          y: 5,
        },
      },
      {
        type: 'CITY',
        factionId: 'BLUE',
        position: {
          x: 8,
          y: 2,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 3,
          y: 5,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 6,
          y: 2,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 4,
          y: 4,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 5,
          y: 3,
        },
      },
    ],
    units: [
      {
        id: '30746783505487185',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 0,
          y: 6,
        },
        life: 80,
      },
      {
        id: '8468449599121219',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 2,
          y: 6,
        },
      },
      {
        id: '6433551151619363',
        type: 'MECH',
        factionId: 'RED',
        position: {
          x: 2,
          y: 5,
        },
      },
      {
        id: '5639279583658974',
        type: 'RECON',
        factionId: 'RED',
        position: {
          x: 1,
          y: 6,
        },
      },
      {
        id: '7272773453764632',
        type: 'ARTILLERY',
        factionId: 'RED',
        position: {
          x: 3,
          y: 6,
        },
      },
      {
        id: '9218914240814986',
        type: 'INFANTERY',
        factionId: 'BLUE',
        position: {
          x: 7,
          y: 1,
        },
        flipped: true,
      },
      {
        id: '7318894776744456',
        type: 'MECH',
        factionId: 'BLUE',
        position: {
          x: 7,
          y: 2,
        },
        flipped: true,
      },
      {
        id: '4672911246097571',
        type: 'MECH',
        factionId: 'BLUE',
        position: {
          x: 8,
          y: 1,
        },
        flipped: true,
      },
      {
        id: '913276466520792',
        type: 'TANK',
        factionId: 'BLUE',
        position: {
          x: 9,
          y: 1,
        },
        flipped: true,
      },
    ],
    name: 'My map',
    description: '',
  }
}

export default mission2
