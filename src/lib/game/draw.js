import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import computeMovementPositions from './computeMovementPositions'
import computeRangePositions from './computeRangePositions'
import PolarPoint from '../common/PolarPoint'
import { samePosition, findById } from '../common/utils'

let gradientAnimationStep = 0
let gradientAnimationDirection = true

function draw(_) {
  const { booleans, viewBox, mouse, worldMap, buildings, units, currentFaction, selectedUnitId, selectedPosition } = store.getState()
  const { width, height } = _.canvas
  const { offsetX, offsetY } = viewBox

  _.fillStyle = 'black'
  _.fillRect(0, 0, width, height)
  
  const tileSize = width / viewBox.width // pixel per tile
  const viewBoxHeight = Math.ceil(height / tileSize) // tiles

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

  /* ------------------------------
    DRAW MOVEMENT AND RANGE TILES
  ------------------------------ */

  if (currentFaction.type === 'HUMAN') {

    let movementPositions
    let rangePositions

    if (selectedUnitId && !booleans.isFireSelection) {
      const selectedUnit = findById(units, selectedUnitId)
      movementPositions = computeMovementPositions(store, selectedUnit)
    }

    if (booleans.isFireSelection) {
      const selectedUnit = findById(units, selectedUnitId)
      rangePositions = computeRangePositions(store, selectedUnit).filter(position => units.some(unit => unit.team !== selectedUnit.team && samePosition(unit.position, position)))
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

function drawUnit(_, tileSize, unit) {
  const { viewBox } = store.getState()
  // // console.log('unit.position', unit.position)
  const x = unit.position.x - viewBox.x 
  const y = unit.position.y - viewBox.y
  const { offsetX, offsetY } = viewBox
  
  _.fillStyle = gameConfiguration.factionsConfiguration[unit.factionId].color
  _.strokeStyle = '#333333'
  _.lineWidth = 2

  switch (unit.type) {

    case 'INFANTERY':
      _.beginPath()
      _.arc((x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY, 0.4 * tileSize, 0, 2 * Math.PI)
      _.closePath()
      _.fill()
      _.stroke()

      if (unit.played) {
        _.fillStyle = 'black'
        _.globalAlpha = 0.5
        _.beginPath()
        _.arc((x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY, 0.4 * tileSize, 0, 2 * Math.PI)
        _.closePath()
        _.fill()
        _.globalAlpha = 1
      }
      break
    
    case 'TANK': 
      _.beginPath()
      _.rect((x + 0.1) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY, 0.8 * tileSize, 0.8 * tileSize)
      _.closePath()
      _.fill()
      _.stroke()

      if (unit.played) {
        _.fillStyle = 'black'
        _.globalAlpha = 0.5
        _.fillRect((x + 0.1) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY, 0.8 * tileSize, 0.8 * tileSize)
        _.globalAlpha = 1
      }
      break

    case 'ARTILLERY':
      _.beginPath()
      _.moveTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
      _.lineTo((x + 0.9) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
      _.lineTo((x + 0.1) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
      _.lineTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
      _.fill()
      _.stroke()

      if (unit.played) {
        _.fillStyle = 'black'
        _.globalAlpha = 0.5
        _.beginPath()
        _.moveTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
        _.lineTo((x + 0.9) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
        _.lineTo((x + 0.1) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
        _.lineTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
        _.fill()
        _.globalAlpha = 1
      }
      break

    case 'SUBMARINE':
      _.beginPath()
      _.moveTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
      _.lineTo((x + 0.9) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
      _.lineTo((x + 0.5) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
      _.lineTo((x + 0.1) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
      _.lineTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
      _.fill()
      _.stroke()

      if (unit.played) {
        _.fillStyle = 'black'
        _.globalAlpha = 0.5
        _.beginPath()
        _.moveTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
        _.lineTo((x + 0.9) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
        _.lineTo((x + 0.5) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
        _.lineTo((x + 0.1) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
        _.lineTo((x + 0.5) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY)
        _.fill()
        _.globalAlpha = 1
      }
      break

    default:
      break
  }

  _.font = `bold ${tileSize / 5}px lato`
  _.textAlign = 'right'
  _.textBaseline = 'alphabetic'
  _.fillStyle = 'white'
  _.fillRect((x + 0.55) * tileSize + offsetX, (y + 0.8) * tileSize + offsetY, 0.45 * tileSize, 0.2 * tileSize)
  _.fillStyle = 'black'
  _.fillText(unit.life, (x + 0.94) * tileSize + offsetX, (y + 0.97) * tileSize + offsetY)

  if (process.env.NODE_ENV !== 'production') {
    _.font = `bold ${tileSize / 3}px lato`
    _.textAlign = 'center'
    _.textBaseline = 'middle'
    _.fillStyle = 'white'
    _.fillText(unit.id.slice(0, 3), (x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
  }

}

function drawBuilding(_, tileSize, building) {
  const { viewBox } = store.getState()
  const x = building.position.x - viewBox.x 
  const y = building.position.y - viewBox.y
  const { offsetX, offsetY } = viewBox
  const factionConfiguration = gameConfiguration.factionsConfiguration[building.factionId]
  const secondaryColor = '#555555'

  _.fillStyle = secondaryColor
  _.strokeStyle = secondaryColor
  _.lineWidth = 1
  _.beginPath()
  _.rect(x * tileSize + offsetX, y * tileSize + offsetY, tileSize, tileSize)
  _.closePath()
  _.fill()
  _.stroke()

  _.fillStyle = factionConfiguration ? factionConfiguration.color : gameConfiguration.terrainConfiguration.BUILDING.color
  _.fillRect((x + 0.1) * tileSize + offsetX, (y + 0.1) * tileSize + offsetY, 0.8 * tileSize, 0.8 * tileSize)

  switch (building.type) {

    case 'HEADQUARTERS':
      drawStar(_, 5, (x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY, 0.3 * tileSize, secondaryColor)

      break

    case 'BASE':
      _.fillStyle = secondaryColor
      _.beginPath()
      _.arc((x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY, 0.2 * tileSize, 0, 2 * Math.PI)
      _.closePath()
      _.fill()

      break
    
    default:
      break
  }
}

function drawStar(_, nPoints, cx, cy, radius, color = 'gold') {
  _.fillStyle = color
  _.beginPath()

  for (let i = 0; i < nPoints; i++) {
    const exteriorPoint = new PolarPoint(2 * i * Math.PI / nPoints - Math.PI / 2, radius).toCartesianPoint()
    const interiorPoint = new PolarPoint(2 * (i + 0.5) * Math.PI / nPoints - Math.PI / 2, radius / 2).toCartesianPoint()

    if (i === 0) _.moveTo(cx + exteriorPoint.x, cy + exteriorPoint.y)
    else _.lineTo(cx + exteriorPoint.x, cy + exteriorPoint.y)

    _.lineTo(cx + interiorPoint.x, cy + interiorPoint.y)
  }

  _.closePath()
  _.fill()
}

export default draw
