function mergeBug() {
  return {
    worldMap: [
      [
        {
          type: 'HEADQUARTERS',
          backgroundImageSource: '/images/tiles/hq_red.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'HEADQUARTERS',
          backgroundImageSource: '/images/tiles/hq_blue.png',
        },
      ],
      [
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
      ],
      [
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
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
          x: 9,
          y: 0,
        },
      },
    ],
    units: [
      {
        id: 'd5494fa5-6800-4820-9fca-a27418a03c15',
        type: 'INFANTERY',
        factionId: 'RED',
        life: 20,
        position: {
          x: 4,
          y: 1,
        },
      },
      {
        id: '63de0fcb-cd7f-4136-b8c7-9d74be3311d9',
        type: 'INFANTERY',
        factionId: 'BLUE',
        life: 20,
        position: {
          x: 5,
          y: 1,
        },
      },
    ],
    name: 'Merge bug',
    description: 'Fix it!',
  }
}

export default mergeBug
