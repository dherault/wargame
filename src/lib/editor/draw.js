import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import drawBuilding from '../common/world/drawBuilding'
import drawUnit from '../common/world/drawUnit'
import loadImages from '../common/loadImages'

const imagesSources = [
  gameConfiguration.imageSources.units,
  ...Object.keys(gameConfiguration.imageSources)
    .filter(key => key.startsWith('tile'))
    .map(key => gameConfiguration.imageSources[key]),
]

// The main draw function for the editor
function draw(_) {
  const { viewBox, mouse, booleans, worldMap, units, selectedTerrainType, selectedBuildingType, selectedBackgroundImageSource, selectedUnitType, selectedFactionId, selectedPosition } = store.getState()
  const { width, height } = _.canvas
  const { offsetX, offsetY } = viewBox

  _.fillStyle = 'black'
  _.fillRect(0, 0, width, height)

  // No data displays only a black screen
  if (!worldMap) return

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

        _.drawImage(
          images[tile.backgroundImageSource],
          (i - (viewBox.x % 1)) * tileSize + offsetX,
          (j - (viewBox.y % 1)) * tileSize + offsetY,
          tileSize,
          tileSize
        )
      }
    }

    /* ---------------
      DRAW SELECTION
    --------------- */

    if (selectedBuildingType && mouseTile) {
      drawBuilding(_, images, tileSize, {
        type: selectedBuildingType,
        factionId: selectedFactionId,
        position: mouse,
      })
    }

    if (selectedTerrainType && selectedBackgroundImageSource && mouseTile) {
      _.drawImage(
        images[selectedBackgroundImageSource],
        (mouse.x - viewBox.x) * tileSize + offsetX,
        (mouse.y - viewBox.y) * tileSize + offsetY,
        tileSize,
        tileSize
      )
    }

    /* -----------
      DRAW UNITS
    ----------- */

    units.forEach(unit => drawUnit(_, tileSize, images, unit))

    if (selectedUnitType && mouseTile) {
      drawUnit(_, tileSize, images, {
        id: '0',
        type: selectedUnitType,
        factionId: selectedFactionId,
        position: mouse,
      })
    }

    /* ---------------------------
      DRAW TILE SELECTION SQUARE
    --------------------------- */

    const position = selectedPosition || mouse

    if (worldMap[position.y] && worldMap[position.y][position.x]) {
      const x = (position.x - viewBox.x) * tileSize + offsetX
      const y = (position.y - viewBox.y) * tileSize + offsetY

      _.lineWidth = 2
      _.strokeStyle = 'red'

      _.beginPath()
      _.rect(x, y, tileSize, tileSize)
      _.closePath()
      _.stroke()

      if (booleans.isDeletingUnits) {
        _.beginPath()
        _.moveTo(x, y)
        _.lineTo(x + tileSize, y + tileSize)
        _.moveTo(x + tileSize, y)
        _.lineTo(x, y + tileSize)
        _.closePath()
        _.stroke()
      }

      if (booleans.isFlippingUnits) {
        _.beginPath()
        _.moveTo(x + 0.3 * tileSize, y + 0.4 * tileSize)
        _.lineTo(x + 0.2 * tileSize, y + 0.5 * tileSize)
        _.lineTo(x + 0.3 * tileSize, y + 0.6 * tileSize)
        _.moveTo(x + 0.2 * tileSize, y + 0.5 * tileSize)
        _.lineTo(x + 0.8 * tileSize, y + 0.5 * tileSize)
        _.lineTo(x + 0.7 * tileSize, y + 0.4 * tileSize)
        _.moveTo(x + 0.8 * tileSize, y + 0.5 * tileSize)
        _.lineTo(x + 0.7 * tileSize, y + 0.6 * tileSize)
        _.closePath()
        _.stroke()
      }
    }

  })
}

export default draw
