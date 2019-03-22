function mission1() {
  return JSON.parse(`{
    "worldMap": [
      [
        "PLAIN",
        "PLAIN",
        "FOREST",
        "ROAD",
        "PLAIN",
        "PLAIN",
        "RIVER",
        "PLAIN",
        "PLAIN",
        "PLAIN"
      ],
      [
        "PLAIN",
        "PLAIN",
        "FOREST",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD"
      ],
      [
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "MOUNTAIN",
        "RIVER",
        "PLAIN",
        "PLAIN",
        "HEADQUARTERS"
      ],
      [
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "RIVER",
        "RIVER",
        "RIVER",
        "RIVER",
        "PLAIN",
        "PLAIN",
        "PLAIN"
      ],
      [
        "HEADQUARTERS",
        "PLAIN",
        "PLAIN",
        "RIVER",
        "MOUNTAIN",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "PLAIN"
      ],
      [
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "FOREST",
        "PLAIN",
        "PLAIN"
      ],
      [
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "RIVER",
        "PLAIN",
        "PLAIN",
        "ROAD",
        "FOREST",
        "PLAIN",
        "PLAIN"
      ]
    ],
    "factions": [
      {
        "id": "RED",
        "type": "HUMAN",
        "team": 1
      },
      {
        "id": "BLUE",
        "type": "COMPUTER",
        "team": 2
      }
    ],
    "buildings": [
      {
        "type": "HEADQUARTERS",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 4
        }
      },
      {
        "type": "HEADQUARTERS",
        "factionId": "BLUE",
        "position": {
          "x": 9,
          "y": 2
        }
      }
    ],
    "units": [
      {
        "id": "4027580108895654",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 1,
          "y": 4
        },
        "life": 100
      },
      {
        "id": "3022363583221621",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 1,
          "y": 5
        },
        "life": 100
      },
      {
        "id": "48240808454914297",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 1,
          "y": 3
        },
        "life": 100
      },
      {
        "id": "45044663801700957",
        "type": "TANK",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 5
        },
        "life": 100
      },
      {
        "id": "65491410322846",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 8,
          "y": 1
        },
        "life": 100,
        "flipped": true
      },
      {
        "id": "3734549933048936",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 8,
          "y": 2
        },
        "life": 100,
        "flipped": true
      },
      {
        "id": "19239041649200184",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 8,
          "y": 3
        },
        "life": 100,
        "flipped": true
      },
      {
        "id": "3973436408608104",
        "type": "TANK",
        "factionId": "BLUE",
        "position": {
          "x": 9,
          "y": 1
        },
        "life": 100,
        "flipped": true
      }
    ],
    "name": "Mission 1",
    "description": "Tutorial 1"
  }`)
}

export default mission1
