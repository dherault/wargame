import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
// import { samePosition } from '../common/utils'
import drawBuilding from '../common/world/drawBuilding'
import drawUnit from '../common/world/drawUnit'
import loadImages from '../common/loadImages'

const imagesSources = [
  gameConfiguration.unitsImageSource,
]

// The main draw function for the editor
function draw(_) {
  const { viewBox, mouse, worldMap, buildings, units, selectedTerrainType, selectedBuildingType, selectedUnitType, selectedFactionId, selectedPosition } = store.getState()
  const { width, height } = _.canvas
  const { offsetX, offsetY } = viewBox

  _.fillStyle = 'black'
  _.fillRect(0, 0, width, height)
  
  const tileSize = width / viewBox.width // pixel per tile
  const viewBoxHeight = Math.ceil(height / tileSize) // tiles
  const mouseTile = worldMap[mouse.y] && worldMap[mouse.y][mouse.x]

  _.lineWidth = 1

  loadImages(imagesSources).then(images => {

    /* ----------------
      DRAW BACKGROUND
    ---------------- */
  
    for (let j = 0; j < viewBoxHeight + 1; j++) { // + 1 for move draw
      const y = Math.floor(j + viewBox.y)
  
      for (let i = 0; i < viewBox.width + 1; i++) {
        const x = Math.floor(i + viewBox.x)
        const tile = worldMap[y] && worldMap[y][x]
  
        if (!tile) continue 
  
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
  
    /* ---------------
      DRAW BUILDINGS
    --------------- */
  
    buildings.forEach(building => drawBuilding(_, tileSize, building))
  
    /* ---------------
      DRAW SELECTION
    --------------- */
  
    if (selectedBuildingType && mouseTile) {
      drawBuilding(_, tileSize, {
        type: selectedBuildingType,
        factionId: selectedFactionId,
        position: mouse,
      })
    }
  
    if (selectedTerrainType && mouseTile) {
      const { color } = gameConfiguration.terrainConfiguration[selectedTerrainType]
  
      _.fillStyle = color
      _.strokeStyle = color
  
      _.beginPath()
      _.rect((mouse.x - (viewBox.x % 1)) * tileSize + offsetX, (mouse.y - (viewBox.y % 1)) * tileSize + offsetY, tileSize, tileSize)
      _.closePath()
      _.fill()
      _.stroke()
    }
  
    /* -----------
      DRAW UNITS
    ----------- */
  
    units.forEach(unit => drawUnit(_, tileSize, images, unit)) 
  
    if (selectedUnitType && mouseTile) {
      drawUnit(_, tileSize, images, {
        type: selectedUnitType,
        factionId: selectedFactionId,
        position: mouse,
        life: 100,
        id: '0',
      })
    }
  
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
  })
}

export default draw
