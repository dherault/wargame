import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import { samePosition } from '../common/utils'
import drawBuilding from '../common/world/drawBuilding'
import drawUnit from '../common/world/drawUnit'

// The main draw function for the game and editor
function draw(_) {
  const { booleans, viewBox, mouse, worldMap, buildings, units, selectedUnitId, selectedPosition } = store.getState()
  const { width, height } = _.canvas
  const { offsetX, offsetY } = viewBox

  _.fillStyle = 'black'
  _.fillRect(0, 0, width, height)
  
  const tileSize = width / viewBox.width // pixel per tile
  const viewBoxHeight = Math.ceil(height / tileSize) // tiles

  // console.log('tileSize', viewBox.width)
  _.lineWidth = 1

  /* ----------------
    DRAW BACKGROUND
  ---------------- */

  for (let j = 0; j < viewBoxHeight + 1; j++) { // + 1 for move draw
    const y = Math.floor(j + viewBox.y)

    for (let i = 0; i < viewBox.width + 1; i++) {
      const x = Math.floor(i + viewBox.x)
      const tile = worldMap[y] && worldMap[y][x]

      if (!tile) continue 

      if (tile === 'BUILDING') {
        const building = buildings.find(building => samePosition(building.position, { x, y }))

        drawBuilding(_, tileSize, building)

        continue
      }

      const { color } = gameConfiguration.terrainConfiguration[tile]

      _.fillStyle = color
      _.strokeStyle = color

      _.beginPath()
      _.rect((i - (viewBox.x % 1)) * tileSize + offsetX, (j - (viewBox.y % 1)) * tileSize + offsetY, tileSize, tileSize)
      _.closePath()
      _.fill()
      _.stroke()
    }
  }

  /* -----------
    DRAW UNITS
  ----------- */

  units.forEach(unit => drawUnit(_, tileSize, unit)) 

  /* ---------------------------
    DRAW TILE SELECTION SQUARE
  --------------------------- */
  
  const position = selectedPosition || mouse
  
  if (worldMap[position.y] && worldMap[position.y][position.x]) {
    _.lineWidth = 2
    _.strokeStyle = 'red'

    _.beginPath()
    _.rect((position.x - viewBox.x) * tileSize + offsetX, (position.y - viewBox.y) * tileSize + offsetY, tileSize, tileSize)
    _.closePath()
    _.stroke()
  }
}

export default draw
