function aiDecisionMaking2() {
  return {
    worldMap: [
      [
        'HEADQUARTERS',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
        'PLAIN',
      ],
      [
        'PLAIN',
        'PLAIN',
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
          y: 2,
        },
      },
    ],
    units: [
      {
        id: '9363960430879139',
        type: 'BATTLE_HELICOPTER',
        factionId: 'RED',
        position: {
          x: 1,
          y: 1,
        },
      },
      {
        id: '3873666886677163',
        type: 'FIGHTER',
        factionId: 'BLUE',
        position: {
          x: 2,
          y: 1,
        },
      },
      {
        id: '7762500392960088',
        type: 'FIGHTER',
        factionId: 'BLUE',
        position: {
          x: 1,
          y: 0,
        },
      },
    ],
    name: 'AI decision making 2',
    description: 'What will AI do ?',
  }
}

export default aiDecisionMaking2
