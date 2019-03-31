function simpleAiAttack() {
  return {
    factions: [
      { id: 'BLUE', team: 1, alive: true, type: 'HUMAN' },
      { id: 'RED', team: 2, alive: true, type: 'COMPUTER' },
    ],
    worldMap: [
      ['PLAIN', 'PLAIN', 'PLAIN'],
      ['PLAIN', 'PLAIN', 'PLAIN'],
      ['PLAIN', 'PLAIN', 'PLAIN'],
      ['SEA', 'SEA', 'SEA'],
      ['HEADQUARTERS', 'HEADQUARTERS', 'PLAIN'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', team: 1, factionId: 'BLUE', position: { x: 0, y: 4 } },
      { type: 'HEADQUARTERS', team: 2, factionId: 'RED', position: { x: 1, y: 4 } },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, position: { x: 2, y: 0 } },
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, position: { x: 2, y: 2 } },
      { type: 'INFANTERY', factionId: 'RED', team: 2, position: { x: 0, y: 0 } },
      { type: 'INFANTERY', factionId: 'RED', team: 2, position: { x: 0, y: 2 } },
    ],
    name: 'Simple AI sattack 3',
    description: 'Only AI plays',
  }
}

export default simpleAiAttack
