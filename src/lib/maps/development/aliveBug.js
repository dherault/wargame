function aliveBug() {
  return {
    worldMap: [
      [
        'HEADQUARTERS',
        'HEADQUARTERS',
        'HEADQUARTERS',
        'CITY',
        'BASE',
        'AIRPORT',
      ],
      [
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
      ],
      [
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
        'MOUNTAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'MOUNTAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'MOUNTAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'MOUNTAIN',
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
      {
        id: 'YELLOW',
        type: 'COMPUTER',
        team: 3,
      },
    ],
    buildings: [
      {
        type: 'HEADQUARTERS',
        factionId: 'RED',
        position: {
          x: 0,
          y: 0,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 0,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'YELLOW',
        position: {
          x: 2,
          y: 0,
        },
      },
      {
        type: 'CITY',
        factionId: 'YELLOW',
        position: {
          x: 3,
          y: 0,
        },
      },
      {
        type: 'BASE',
        factionId: 'YELLOW',
        position: {
          x: 4,
          y: 0,
        },
      },
      {
        type: 'AIRPORT',
        factionId: 'YELLOW',
        position: {
          x: 5,
          y: 0,
        },
      },
    ],
    units: [
      {
        id: '22136980851062726',
        type: 'TANK',
        factionId: 'BLUE',
        position: {
          x: 5,
          y: 3,
        },
        flipped: true,
      },
      {
        id: '573770269296322',
        type: 'NEO_TANK',
        factionId: 'RED',
        position: {
          x: 1,
          y: 3,
        },
        flipped: true,
      },
      {
        id: '4565510594583775',
        type: 'INFANTERY',
        factionId: 'YELLOW',
        position: {
          x: 1,
          y: 5,
        },
      },
    ],
    name: 'Alive bug',
    description: 'Fix it!',
  }
}

export default aliveBug
