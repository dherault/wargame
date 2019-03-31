function captureBug() {
  return {
    worldMap: [
      [
        'HEADQUARTERS',
        'SEA',
        'HEADQUARTERS',
      ],
      [
        'PLAIN',
        'SEA',
        'PLAIN',
      ],
      [
        'CITY',
        'SEA',
        'CITY',
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
          y: 0,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'BLUE',
        position: {
          x: 2,
          y: 0,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 2,
          y: 2,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 0,
          y: 2,
        },
      },
    ],
    units: [
      {
        id: '09899016101046354',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 0,
          y: 1,
        },
      },
      {
        id: '8542462481479045',
        type: 'INFANTERY',
        factionId: 'BLUE',
        position: {
          x: 2,
          y: 1,
        },
      },
    ],
    name: 'Capture bug',
    description: 'Fix it!',
  }
}

export default captureBug
