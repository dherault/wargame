function simpleAiAttack() {
  return {
    factions: [
      { id: 'BLUE', team: 1, type: 'HUMAN' }, 
      { id: 'RED', team: 2, type: 'COMPUTER' },
    ],
    worldMap: [
      ['HEADQUARTERS', 'PLAIN', 'PLAIN'],
      ['PLAIN', 'PLAIN', 'PLAIN'],
      ['PLAIN', 'PLAIN', 'PLAIN'],
      ['SEA', 'SEA', 'SEA'],
      ['HEADQUARTERS', 'PLAIN', 'PLAIN'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', factionId: 'BLUE', position: { x: 0, y: 4 } },
      { type: 'HEADQUARTERS', factionId: 'RED', position: { x: 0, y: 0 } },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'BLUE', position: { x: 1, y: 4 } },
      { type: 'ARTILLERY', factionId: 'RED', position: { x: 1, y: 0 } },
    ],
    name: 'Simple AI sattack',
    description: 'Only AI plays',
  }
}

export default simpleAiAttack
