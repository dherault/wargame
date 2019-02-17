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
  'GRASS',
  'GRASS',
  'ROAD',
  'ROAD',
  'FOREST',
  'MOUNTAIN',
  'RIVER',
]

function generateWorldMap() {
  const map = []
  const width = 100
  const height = 100
  const seaWidth = 5

  for (let j = 0; j < height; j++) {
    const row = []
    
    for (let i = 0; i < width; i++) {
      row.push({
        type: i < seaWidth || i >= width - seaWidth || j < seaWidth || j >= height - seaWidth ? 'SEA' : randomArray(tilesTypes)
      })
    }
    
    map.push(row)
  }

  return map
}

export default generateWorldMap