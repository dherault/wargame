function mergeTest() {
  return {
    worldMap: [
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
        'HEADQUARTERS',
        'PLAIN',
        'PLAIN',
        'PLAIN',
        'MOUNTAIN',
        'HEADQUARTERS',
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
        type: 'HUMAN',
        team: 2,
      },
    ],
    buildings: [
      {
        type: 'HEADQUARTERS',
        factionId: 'RED',
        position: {
          x: 0,
          y: 5,
        },
      },
      {
        type: 'HEADQUARTERS',
        factionId: 'BLUE',
        position: {
          x: 5,
          y: 5,
        },
      },
    ],
    units: [
      {
        id: '3b996a00-1007-4e4f-8b6a-5fdb6152ea35',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 0,
          y: 3,
        },
        life: 50,
      },
      {
        id: '1e1fc59c-0300-4522-af7b-a1d56e332e36',
        type: 'INFANTERY',
        factionId: 'RED',
        position: {
          x: 2,
          y: 3,
        },
        life: 50,
      },
      {
        id: 'e95975ed-f721-4396-be86-bb9bbb2634e5',
        type: 'TANK',
        factionId: 'RED',
        position: {
          x: 0,
          y: 2,
        },
        life: 25,
      },
      {
        id: '90c2f782-421c-4769-89a2-964dd95c0895',
        type: 'TANK',
        factionId: 'RED',
        position: {
          x: 2,
          y: 2,
        },
        life: 35,
      },
      {
        id: 'f2cdb29c-232a-4b0d-85ce-b9104a644010',
        type: 'ARTILLERY',
        factionId: 'RED',
        position: {
          x: 0,
          y: 1,
        },
        life: 75,
      },
      {
        id: '48308b2e-5f8a-4c5d-99c2-fd4db1d316d3',
        type: 'ARTILLERY',
        factionId: 'RED',
        position: {
          x: 2,
          y: 1,
        },
        life: 50,
      },
      {
        id: '68a9c387-818b-41e8-ad5e-1251d495c1d7',
        type: 'BOMBER',
        factionId: 'RED',
        position: {
          x: 0,
          y: 0,
        },
        life: 99,
      },
      {
        id: '4570a056-e761-4d04-846b-8ad8b2e64f6e',
        type: 'BOMBER',
        factionId: 'RED',
        position: {
          x: 2,
          y: 0,
        },
        life: 99,
      },
      {
        id: 'd3b4caf1-a86a-4db2-b294-b3a8c7e3a687',
        type: 'TANK',
        factionId: 'BLUE',
        position: {
          x: 5,
          y: 5,
        },
      },
      {
        id: '05ddb32c-8072-4af4-a4bd-9fc428c70629',
        type: 'BATTLE_HELICOPTER',
        factionId: 'RED',
        position: {
          x: 0,
          y: 4,
        },
      },
      {
        id: 'ee6bf8e7-7cc7-4d2c-827c-fa94548eafcd',
        type: 'BATTLE_HELICOPTER',
        factionId: 'RED',
        position: {
          x: 2,
          y: 4,
        },
      },
    ],
    name: 'mergeTest',
    description: 'Merge those units',
  }
}

export default mergeTest
