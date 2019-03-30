function aiDecisionMaking1() {
  return {
    worldMap: [
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'MOUNTAIN',
        'HEADQUARTERS',
      ],
      [
        'PLAIN',
        'MOUNTAIN',
        'CITY',
        'CITY',
        'MOUNTAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'MOUNTAIN',
        'PLAIN',
        'PLAIN',
        'MOUNTAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'MOUNTAIN',
        'PLAIN',
        'PLAIN',
        'MOUNTAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'MOUNTAIN',
        'CITY',
        'CITY',
        'MOUNTAIN',
        'PLAIN',
      ],
      [
        'HEADQUARTERS',
        'MOUNTAIN',
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
        type: 'CITY',
        factionId: null,
        position: {
          x: 2,
          y: 1,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 3,
          y: 4,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'RED',
        position: {
          x: 5,
          y: 0,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'BLUE',
        position: {
          x: 0,
          y: 5,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 3,
          y: 1,
        },
      },
      {
        type: 'CITY',
        factionId: null,
        position: {
          x: 2,
          y: 4,
        },
      },
    ],
    units: [
      {
        id: '970685109900957',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 5,
          y: 1,
        },
      },
      {
        id: '7227288216902121',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 5,
          y: 2,
        },
      },
      {
        id: '7615595476520542',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 5,
          y: 3,
        },
      },
      {
        id: '24511701443592937',
        type: 'INFANTERY',
        factionId: 'BLUE',
        position: {
          x: 0,
          y: 4,
        },
      },
      {
        id: '471089865178685',
        type: 'ARTILLERY',
        factionId: 'BLUE',
        position: {
          x: 0,
          y: 5,
        },
      },
      {
        id: '39583613139076745',
        type: 'INFANTERY',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 3,
        },
      },
      {
        id: '529692125661696',
        type: 'TANK',
        factionId: 'RED',
        position: {
          x: 5,
          y: 0,
        },
      },
      {
        id: '8128369091319194',
        type: 'TANK',
        factionId: 'RED',
        position: {
          x: 5,
          y: 4,
        },
      },
    ],
    name: 'Ai decision making 1',
    description: 'What will AI do ?',
  }
}

export default aiDecisionMaking1
