import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import computeRangePositions from './computeRangePositions'
import computeMovementPositions from './computeMovementPositions'
import computeVisionPositionsHashes from './computeVisionPositionHashes'
import { samePosition, findById, hash } from '../common/utils'
import drawBuilding from '../common/world/drawBuilding'
import drawUnit from '../common/world/drawUnit'
import loadImages from '../common/loadImages'

let gradientAnimationStep = 0
let gradientAnimationDirection = true

const imagesSources = [
  gameConfiguration.unitsImageSource,
  gameConfiguration.playedUnitsImageSource,
]

// The main draw function for the game
function draw(_) {
  const { booleans, viewBox, mouse, worldMap, buildings, units, selectedUnitId, selectedPosition } = store.getState()
  const { width, height } = _.canvas
  const { offsetX, offsetY } = viewBox

  _.fillStyle = 'black'
  _.fillRect(0, 0, width, height)
  
  const tileSize = width / viewBox.width // pixel per tile
  const viewBoxHeight = Math.ceil(height / tileSize) // tiles

  _.lineWidth = 1

  let visionPositionHashes

  if (booleans.isFogOfWar) {
    visionPositionHashes = computeVisionPositionsHashes(store)
  }

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

        if (booleans.isFogOfWar && !visionPositionHashes.has(hash({ x, y }))) {
          _.fillStyle = 'black'
          _.strokeStyle = 'black'
          _.globalAlpha = 0.33

          _.beginPath()
          _.rect((i - (viewBox.x % 1)) * tileSize + offsetX, (j - (viewBox.y % 1)) * tileSize + offsetY, tileSize, tileSize)
          _.closePath()
          _.fill()
          _.stroke()

          _.globalAlpha = 1
        }
      }
    }

    /* ---------------
      DRAW BUILDINGS
    --------------- */

    buildings.forEach(building => drawBuilding(_, tileSize, building))

    /* ------------------------------
      DRAW MOVEMENT AND RANGE TILES
    ------------------------------ */

    let movementPositions
    let rangePositions

    if (selectedUnitId && !booleans.isFireSelection) {
      const selectedUnit = findById(units, selectedUnitId)
      movementPositions = computeMovementPositions(store, selectedUnit)
    }

    if (booleans.isFireSelection) {
      const selectedUnit = findById(units, selectedUnitId)
      
      rangePositions = computeRangePositions(store, selectedUnit).filter(position => units.some(unit => unit.team !== selectedUnit.team && samePosition(unit.position, position) && !!gameConfiguration.unitsConfiguration[selectedUnit.type].damages[unit.type]))
    }

    if (booleans.isRightButtonDown) {
      const rightClickedUnit = units.find(unit => samePosition(unit.position, mouse))

      if (rightClickedUnit) rangePositions = computeRangePositions(store, rightClickedUnit)
    }

    if (rangePositions || movementPositions) {
      gradientAnimationStep += 1

      if (gradientAnimationStep > 100) {
        gradientAnimationStep = 0
        gradientAnimationDirection = !gradientAnimationDirection
      }

      const gradient = _.createLinearGradient(width, 0, 0, width)
          
      gradient.addColorStop(0, rangePositions ? 'rgba(255, 50, 50, 0.85)' : 'rgba(250, 250, 250, 0.85)')
      gradient.addColorStop(gradientAnimationDirection ? 1 - gradientAnimationStep / 100 : gradientAnimationStep / 100, rangePositions ? 'rgba(140, 30, 30, 0.85)' : 'rgba(180, 180, 180, 0.85)')
      gradient.addColorStop(1, rangePositions ? 'rgba(255, 50, 50, 0.85)' : 'rgba(250, 250, 250, 0.85)')
      
      _.fillStyle = gradient
      _.strokeStyle = gradient;
      
      (rangePositions || movementPositions).forEach(tile => {
        _.beginPath()
        _.rect((tile.x - viewBox.x) * tileSize + offsetX, (tile.y - viewBox.y) * tileSize + offsetY, tileSize, tileSize)
        _.closePath()
        _.fill()
        _.stroke()
      })
    }

    /* -----------
      DRAW UNITS
    ----------- */

    units.forEach(unit => {
      if (!booleans.isFogOfWar || visionPositionHashes.has(hash(unit.position))) {
        drawUnit(_, tileSize, images, unit)
      }
    }) 

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
