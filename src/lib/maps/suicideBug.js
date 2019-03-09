function suicideBug() {
  return JSON.parse(`{
    "worldMap": [
      [
        "HEADQUARTERS",
        "PLAIN",
        "PLAIN"
      ],
      [
        "PLAIN",
        "PLAIN",
        "PLAIN"
      ],
      [
        "PLAIN",
        "PLAIN",
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
          "x": 2,
          "y": 2
        }
      }
    ],
    "units": [
      {
        "id": "5132668047628859",
        "type": "INFANTERY",
        "factionId": "RED",
        "position": {
          "x": 1,
          "y": 0
        },
        "life": 1
      },
      {
        "id": "7933244862981761",
        "type": "INFANTERY",
        "factionId": "BLUE",
        "position": {
          "x": 2,
          "y": 2
        },
        "life": 100
      }
    ],
    "name": "Suicide bug",
    "description": "Fix it!"
  }`)
}

export default suicideBug
