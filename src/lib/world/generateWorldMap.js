import { randomArray } from '../utils'

/*
tiles:
0 - grass
1 - road
2 - forest
3 - mountain
4 - river
5 - sea
cost:
0 - foot
1 - wheel
3 - fly
4 - sail
*/
const tilesTypes = [
  'GRASS',
  'ROAD',
  'FOREST',
  'MOUNTAIN',
  'RIVER',
  'SEA',
]

function generateWorldMap() {
  const map = []

  for (let i = 0; i < 100; i++) {
    const row = []
    
    for (let j = 0; j < 100; j++) {
      row.push({
        type: randomArray(tilesTypes)
      })
    }
    
    map.push(row)
  }

  return map
}

export default generateWorldMap