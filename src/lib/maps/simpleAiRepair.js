import { createId } from '../utils'

function simpleAiCapture() {
  return {
    factions: [
      { id: 'BLUE', team: 1, alive: true, type: 'HUMAN' }, 
      { id: 'RED', team: 2, alive: true, type: 'COMPUTER' },
    ],
    worldMap: [
      ['BUILDING', 'PLAIN', 'PLAIN'],
      ['SEA', 'SEA', 'SEA'],
      ['BUILDING', 'PLAIN', 'PLAIN'],
    ],
    buildings: [
      { type: 'HEADQUARTERS', team: 2, factionId: 'RED', capture: 100, position: { x: 0, y: 0 }, id: createId() },
      { type: 'HEADQUARTERS', team: 1, factionId: 'BLUE', capture: 100, position: { x: 0, y: 2 }, id: createId() },
    ],
    units: [
      { type: 'INFANTERY', factionId: 'RED', team: 2, life: 20, played: false, position: { x: 1, y: 0 }, id: createId() },
      { type: 'INFANTERY', factionId: 'BLUE', team: 1, life: 20, played: false, position: { x: 1, y: 2 }, id: createId() },
    ],
    name: 'Simple AI repair',
    description: 'Only AI plays',
  }
}

export default simpleAiCapture
