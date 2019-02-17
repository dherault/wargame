import { randomArray } from '../utils'

/*
tiles:
0 - grass
1 - road
2 - forest
3 - mountain
4 - river
5 - sea
*/
const tilesTypes = [
  'GRASS',
  'GRASS',
  'GRASS',
  'GRASS',
  'GRASS',
  'ROAD',
  'ROAD',
  'ROAD',
  'ROAD',
  'FOREST',
  'MOUNTAIN',
  'RIVER',
]

function generateWorldMap() {
  const map = []
  const width = 15
  const height = 15
  const seaWidth = 1

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