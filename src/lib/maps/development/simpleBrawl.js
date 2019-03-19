function simpleBrawl() {
  return JSON.parse(`{
    "worldMap": [
      [
        "HEADQUARTERS",
        "RIVER",
        "BASE",
        "PLAIN",
        "PLAIN",
        "MOUNTAIN",
        "FOREST"
      ],
      [
        "RIVER",
        "RIVER",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "FOREST"
      ],
      [
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD",
        "ROAD"
      ],
      [
        "FOREST",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "PLAIN",
        "RIVER",
        "RIVER"
      ],
      [
        "FOREST",
        "MOUNTAIN",
        "PLAIN",
        "PLAIN",
        "BASE",
        "RIVER",
        "HEADQUARTERS"
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
          "y": 0
        }
      },
      {
        "type": "HEADQUARTERS",
        "factionId": "BLUE",
        "position": {
          "x": 6,
          "y": 4
        }
      },
      {
        "type": "BASE",
        "factionId": "BLUE",
        "position": {
          "x": 4,
          "y": 4
        }
      },
      {
        "type": "BASE",
        "factionId": "RED",
        "position": {
          "x": 2,
          "y": 0
        }
      }
    ],
    "units": [
      {
        "id": "12062954215911259",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 2
        },
        "life": 100
      },
      {
        "id": "8238753154052059",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 3
        },
        "life": 100
      },
      {
        "id": "046422693839874185",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 0,
          "y": 4
        },
        "life": 100
      },
      {
        "id": "0016444741641850058",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 6,
          "y": 0
        },
        "life": 100
      },
      {
        "id": "9053193238989516",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 6,
          "y": 1
        },
        "life": 100
      },
      {
        "id": "5171871650069821",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 6,
          "y": 2
        },
        "life": 100
      }
    ],
    "name": "Simple brawl",
    "description": "Let's have a fight"
  }`)
}

export default simpleBrawl
