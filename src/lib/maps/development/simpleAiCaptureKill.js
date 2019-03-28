function simpleAiCaptureKill() {
  return {  
    worldMap: [  
      [  
        'HEADQUARTERS',
        'PLAIN',
        'MOUNTAIN',
        'MOUNTAIN',
        'FOREST',
      ],
      [  
        'ROAD',
        'CITY',
        'PLAIN',
        'PLAIN',
        'FOREST',
      ],
      [  
        'ROAD',
        'ROAD',
        'CITY',
        'ROAD',
        'ROAD',
      ],
      [  
        'FOREST',
        'PLAIN',
        'PLAIN',
        'CITY',
        'ROAD',
      ],
      [  
        'FOREST',
        'MOUNTAIN',
        'MOUNTAIN',
        'PLAIN',
        'HEADQUARTERS',
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
        type: 'COMPUTER',
        team: 2,
      },
    ],
    buildings: [  
      {  
        type: 'HEADQUARTERS',
        factionId: 'BLUE',
        position: {  
          x: 0,
          y: 0,
        },
      },
      {  
        type: 'HEADQUARTERS',
        factionId: 'RED',
        position: {  
          x: 4,
          y: 4,
        },
      },
      {  
        type: 'CITY',
        factionId: 'BLUE',
        position: {  
          x: 1,
          y: 1,
        },
      },
      {  
        type: 'CITY',
        factionId: 'RED',
        position: {  
          x: 3,
          y: 3,
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
    ],
    units: [  
      {  
        id: '682205380521169',
        type: 'INFANTERY',
        factionId: 'BLUE',
        position: {  
          x: 1,
          y: 1,
        },
        life: 100,
      },
      {  
        id: '42867387679837976',
        type: 'TANK',
        factionId: 'RED',
        position: {  
          x: 3,
          y: 3,
        },
        life: 100,
      },
    ],
    name: 'Simple AI capture kill',
    description: 'Both human and AI play',
  }
}

export default simpleAiCaptureKill
