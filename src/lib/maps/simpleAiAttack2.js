import { createId } from '../common/utils'

function simpleAiAttack() {
  return {
    factions: [
      { id: 'BLUE', team: 1, alive: true, type: 'HUMAN' }, 
      { id: 'RED', team: 2, alive: true, type: 'COMPUTER' },
    ],
    worldMap: [
      ['PLAIN', 'SEA', 'SEA'],
      ['PLAIN', 'PLAIN', 'SEA'],
      ['PLAIN', 'SEA', 'SEA'],
      ['SEA', 'SEA', 'SEA'],
      ['BUILDING', 'BUILDING', 'PLAIN'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', team: 1, factionId: 'BLUE', capture: 100, position: { x: 0, y: 4 }, id: createId() },
      { type: 'HEADQUARTERS', team: 2, factionId: 'RED', capture: 100, position: { x: 1, y: 4 }, id: createId() },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, life: 100, played: false, position: { x: 1, y: 1 }, id: createId() },
      { type: 'INFANTERY', factionId: 'RED', team: 2, life: 100, played: false, position: { x: 0, y: 0 }, id: createId() },
      { type: 'INFANTERY', factionId: 'RED', team: 2, life: 100, played: false, position: { x: 0, y: 2 }, id: createId() },
    ],
    name: 'Simple AI sattack 2',
    description: 'Only AI plays',
  }
}

export default simpleAiAttack
