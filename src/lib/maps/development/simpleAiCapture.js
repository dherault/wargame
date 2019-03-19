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
      { type: 'HEADQUARTERS', team: 2, factionId: 'RED', capture: 100, position: { x: 0, y: 2 } },
      { type: 'HEADQUARTERS', team: 1, factionId: 'BLUE', capture: 100, position: { x: 0, y: 0 } },
      { type: 'CITY', team: 0, factionId: null, capture: 100, position: { x: 2, y: 0 } },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, life: 100, played: false, position: { x: 1, y: 2 } },
      { type: 'INFANTERY', factionId: 'RED', team: 2, life: 100, played: false, position: { x: 1, y: 0 } },
    ],
    name: 'Simple AI capture',
    description: 'Only AI plays',
  }
}

export default simpleAiCapture
