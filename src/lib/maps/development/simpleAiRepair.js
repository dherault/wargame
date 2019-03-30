function simpleAiCapture() {
  return {
    factions: [
      { id: 'BLUE', team: 1, alive: true, type: 'HUMAN' },
      { id: 'RED', team: 2, alive: true, type: 'COMPUTER' },
    ],
    worldMap: [
      ['HEADQUARTERS', 'SEA', 'SEA', 'HEADQUARTERS'],
      ['PLAIN', 'SEA', 'SEA', 'PLAIN'],
      ['PLAIN', 'SEA', 'SEA', 'PLAIN'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', team: 2, factionId: 'RED', position: { x: 0, y: 0 } },
      { type: 'HEADQUARTERS', team: 1, factionId: 'BLUE', position: { x: 3, y: 0 } },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'RED', team: 2, life: 20, position: { x: 0, y: 1 } },
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, life: 20, position: { x: 3, y: 1 } },
    ],
    name: 'Simple AI repair',
    description: 'Only AI plays',
  }
}

export default simpleAiCapture
