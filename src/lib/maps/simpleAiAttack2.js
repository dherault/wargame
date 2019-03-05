function simpleAiAttack2() {
  return {
    factions: [
      { id: 'BLUE', team: 1, type: 'HUMAN' }, 
      { id: 'RED', team: 2, type: 'COMPUTER' },
    ],
    worldMap: [
      ['PLAIN', 'SEA', 'SEA'],
      ['PLAIN', 'PLAIN', 'SEA'],
      ['PLAIN', 'SEA', 'SEA'],
      ['SEA', 'SEA', 'SEA'],
      ['HEADQUARTERS', 'HEADQUARTERS', 'PLAIN'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', factionId: 'BLUE', position: { x: 0, y: 4 } },
      { type: 'HEADQUARTERS', factionId: 'RED', position: { x: 1, y: 4 } },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'BLUE', position: { x: 1, y: 1 } },
      { type: 'INFANTERY', factionId: 'RED', position: { x: 0, y: 0 } },
      { type: 'INFANTERY', factionId: 'RED', position: { x: 0, y: 2 } },
    ],
    name: 'Simple AI sattack 2',
    description: 'Only AI plays',
  }
}

export default simpleAiAttack2
