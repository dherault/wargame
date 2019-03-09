function simpleAiCollision() {
  return JSON.parse(`{
    "worldMap": [
      [
        "PLAIN",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "PLAIN"
      ],
      [
        "PLAIN",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "PLAIN"
      ],
      [
        "HEADQUARTERS",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "HEADQUARTERS"
      ],
      [
        "PLAIN",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "PLAIN"
      ],
      [
        "PLAIN",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
        "SEA",
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
          "y": 2
        }
      },
      {
        "type": "HEADQUARTERS",
        "factionId": "BLUE",
        "position": {
          "x": 7,
          "y": 2
        }
      }
    ],
    "units": [
      {
        "id": "6008976929914334",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 0
        },
        "life": 100
      },
      {
        "id": "7002462187525387",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 1
        },
        "life": 100
      },
      {
        "id": "2846336243320269",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 3
        },
        "life": 100
      },
      {
        "id": "5489103156650608",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 4
        },
        "life": 100
      },
      {
        "id": "8813879666742777",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 7,
          "y": 3
        },
        "life": 100
      },
      {
        "id": "12689272191342527",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 7,
          "y": 4
        },
        "life": 100
      },
      {
        "id": "3079130123618168",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 7,
          "y": 1
        },
        "life": 100
      },
      {
        "id": "9671262024108667",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 7,
          "y": 0
        },
        "life": 100
      }
    ],
    "name": "Simple AI collision",
    "description": "Only AI plays"
  }`)
}

export default simpleAiCollision
