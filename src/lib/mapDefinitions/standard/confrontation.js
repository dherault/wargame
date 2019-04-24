function confrontation() {

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
          type: 'MOUNTAIN',
          backgroundImageSource: '/images/tiles/mountain.png',
        },
        {
          type: 'RIVER',
          backgroundImageSource: '/images/tiles/river2.png',
        },
        {
          type: 'FOREST',
          backgroundImageSource: '/images/tiles/forest2.png',
        },
        {
          type: 'FOREST',
          backgroundImageSource: '/images/tiles/forest2.png',
        },
        {
          type: 'FOREST',
          backgroundImageSource: '/images/tiles/forest2.png',
        },
      ],
      [
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road9.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road9.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
      ],
      [
        {
          type: 'BASE',
          backgroundImageSource: '/images/tiles/base_red.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road2.png',
        },
        {
          type: 'CITY',
          backgroundImageSource: '/images/tiles/city_neutral.png',
        },
        {
          type: 'RIVER',
          backgroundImageSource: '/images/tiles/river2.png',
        },
        {
          type: 'CITY',
          backgroundImageSource: '/images/tiles/city_neutral.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road2.png',
        },
        {
          type: 'CITY',
          backgroundImageSource: '/images/tiles/city_neutral.png',
        },
      ],
      [
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road2.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'RIVER',
          backgroundImageSource: '/images/tiles/river2.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road2.png',
        },
        {
          type: 'PLAIN',
          backgroundImageSource: '/images/tiles/plain.png',
        },
      ],
      [
        {
          type: 'CITY',
          backgroundImageSource: '/images/tiles/city_neutral.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road2.png',
        },
        {
          type: 'CITY',
          backgroundImageSource: '/images/tiles/city_neutral.png',
        },
        {
          type: 'RIVER',
          backgroundImageSource: '/images/tiles/river2.png',
        },
        {
          type: 'CITY',
          backgroundImageSource: '/images/tiles/city_neutral.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road2.png',
        },
        {
          type: 'BASE',
          backgroundImageSource: '/images/tiles/base_blue.png',
        },
      ],
      [
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road7.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road7.png',
        },
        {
          type: 'ROAD',
          backgroundImageSource: '/images/tiles/road1.png',
        },
      ],
      [
        {
          type: 'FOREST',
          backgroundImageSource: '/images/tiles/forest2.png',
        },
        {
          type: 'FOREST',
          backgroundImageSource: '/images/tiles/forest2.png',
        },
        {
          type: 'FOREST',
          backgroundImageSource: '/images/tiles/forest2.png',
        },
        {
          type: 'RIVER',
          backgroundImageSource: '/images/tiles/river2.png',
        },
        {
          type: 'MOUNTAIN',
          backgroundImageSource: '/images/tiles/mountain.png',
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
          x: 4,
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
          x: 2,
          y: 4,
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
          y: 4,
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
          x: 6,
          y: 6,
        },
      },
      {
        type: 'BASE',
        factionId: 'RED',
        position: {
          x: 0,
          y: 2,
        },
      },
      {
        type: 'BASE',
        factionId: 'BLUE',
        position: {
          x: 6,
          y: 4,
        },
      },
    ],
    units: [],
    name: 'Confrontation',
    description: 'A confrontation arises',
  }
}

export default confrontation
