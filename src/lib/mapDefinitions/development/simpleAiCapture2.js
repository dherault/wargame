function simpleAiCapture() {
  return {
    factions: [
      { id: 'BLUE', team: 1, alive: true, type: 'HUMAN' },
      { id: 'RED', team: 2, alive: true, type: 'COMPUTER' },
    ],
    worldMap: [
      ['HEADQUARTERS', 'PLAIN', 'CITY'],
      ['SEA', 'SEA', 'SEA'],
      ['HEADQUARTERS', 'PLAIN', 'PLAIN'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', team: 2, factionId: 'RED', position: { x: 0, y: 2 } },
      { type: 'HEADQUARTERS', team: 1, factionId: 'BLUE', position: { x: 0, y: 0 } },
      { type: 'CITY', team: 1, factionId: 'BLUE', position: { x: 2, y: 0 } },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, position: { x: 1, y: 2 } },
      { type: 'INFANTERY', factionId: 'RED', team: 2, position: { x: 1, y: 0 } },
    ],
    name: 'Simple AI capture 2',
    description: 'Only AI plays',
  }
}

export default simpleAiCapture
