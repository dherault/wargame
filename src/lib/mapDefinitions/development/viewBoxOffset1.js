function simpleAiCapture() {
  return {
    factions: [
      { id: 'BLUE', team: 1, alive: true, type: 'HUMAN' },
      { id: 'RED', team: 2, alive: true, type: 'HUMAN' },
    ],
    worldMap: [
      ['HEADQUARTERS', 'HEADQUARTERS', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'ROAD'],
      ['PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'ROAD'],
      ['PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'PLAIN', 'ROAD'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', team: 1, factionId: 'BLUE', position: { x: 1, y: 0 } },
      { type: 'HEADQUARTERS', team: 2, factionId: 'RED', position: { x: 0, y: 0 } },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, position: { x: 1, y: 0 } },
      { type: 'INFANTERY', factionId: 'RED', team: 2, position: { x: 0, y: 0 } },
    ],
    name: 'View Box Offset 1',
    description: 'To test the viewBox offset',
  }
}

export default simpleAiCapture
