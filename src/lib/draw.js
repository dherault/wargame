import store from '../state/store'
import gameConfiguration from './gameConfiguration'
import computeMovementTiles from './units/computeMovementTiles'
import computeRangeTiles from './units/computeRangeTiles'

let gradientAnimationStep = 0
let gradientAnimationDirection = true

function draw(_) {
  const { viewBox, mouse, worldMap, units, turn, selectedUnits, selectedTile } = store.getState()
  const { width, height } = _.canvas

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
      const tile = worldMap[y] && worldMap[y][Math.floor(i + viewBox.x)]

      if (!tile) continue 

      const color = gameConfiguration.tilesConfiguration[tile.type].color

      _.fillStyle = color
      _.strokeStyle = color

      _.beginPath()
      _.rect((i - viewBox.x % 1) * tileSize, (j - viewBox.y % 1) * tileSize, tileSize, tileSize)
      _.closePath()
      _.fill()
      _.stroke()
    }
  }

  /* -----------
    DRAW UNITS
  ----------- */

  units.forEach(unit => drawUnit(_, tileSize, unit)) 

  /* ------------------------------
    DRAW MOVEMENT AND RANGE TILES
  ------------------------------ */

  if (turn.playerType === 'HUMAN') {

    let movementTiles
    let rangeTiles

    if (mouse.rightButtonDown) {
      const rightClickedUnit = units.find(unit => unit.position.x === mouse.x && unit.position.y === mouse.y)
  
      if (rightClickedUnit) rangeTiles = computeRangeTiles(rightClickedUnit)
    }

    if (selectedUnits[0]) movementTiles = computeMovementTiles(selectedUnits[0])

    if (movementTiles || rangeTiles) {
      gradientAnimationStep += 1

      if (gradientAnimationStep > 100) {
        gradientAnimationStep = 0
        gradientAnimationDirection = !gradientAnimationDirection
      }

      const gradient = _.createLinearGradient(width, 0, 0, width);
          
      gradient.addColorStop(0, movementTiles ? 'rgba(250, 250, 250, 0.85)' : 'rgba(255, 50, 50, 0.85)')
      gradient.addColorStop(gradientAnimationDirection ? 1 - gradientAnimationStep / 100 : gradientAnimationStep / 100, movementTiles ? 'rgba(180, 180, 180, 0.85)' : 'rgba(140, 30, 30, 0.85)')
      gradient.addColorStop(1, movementTiles ? 'rgba(250, 250, 250, 0.85)' : 'rgba(255, 50, 50, 0.85)')
      
      _.fillStyle = gradient
      _.strokeStyle = gradient;
      
      (movementTiles || rangeTiles).forEach(tile => {
        _.beginPath()
        _.rect((tile.x - viewBox.x) * tileSize, (tile.y - viewBox.y) * tileSize, tileSize, tileSize)
        _.closePath()
        _.fill()
        _.stroke()
      })
    }
  }

  /* ---------------------------
    DRAW TILE SELECTION SQUARE
  --------------------------- */

  _.lineWidth = 2
  _.strokeStyle = 'red'

  const tile = selectedTile || mouse

  _.beginPath()
  _.rect((tile.x - viewBox.x) * tileSize, (tile.y - viewBox.y) * tileSize, tileSize, tileSize)
  _.closePath()
  _.stroke()
}

function drawUnit(_, tileSize, unit) {
  const { viewBox } = store.getState()
  const x = unit.position.x - viewBox.x
  const y = unit.position.y - viewBox.y
  
  _.fillStyle = gameConfiguration.factionsConfiguration[unit.faction].color
  _.strokeStyle = '#333333'
  _.lineWidth = 2

  switch (unit.type) {

    case 'INFANTERY':
      _.fillStyle = gameConfiguration.factionsConfiguration[unit.faction].color
      _.beginPath()
      _.arc((x + 0.5) * tileSize, (y+ 0.5) * tileSize, 0.4 * tileSize, 0, 2 * Math.PI)
      _.closePath()
      _.fill()
      _.stroke()

      if (unit.played) {
        _.fillStyle = 'black'
        _.globalAlpha = 0.5
        _.beginPath()
        _.arc((x + 0.5) * tileSize, (y+ 0.5) * tileSize, 0.4 * tileSize, 0, 2 * Math.PI)
        _.closePath()
        _.fill()
        _.globalAlpha = 1
      }
      break
    
    case 'TANK': 
      _.fillStyle = gameConfiguration.factionsConfiguration[unit.faction].color
      _.beginPath()
      _.rect((x + 0.1) * tileSize, (y + 0.1) * tileSize, 0.8 * tileSize, 0.8 * tileSize)
      _.closePath()
      _.fill()
      _.stroke()

      if (unit.played) {
        _.fillStyle = 'black'
        _.globalAlpha = 0.5
        _.fillRect((x + 0.1) * tileSize, (y + 0.1) * tileSize, 0.8 * tileSize, 0.8 * tileSize)
        _.globalAlpha = 1
      }
      break

    case 'ARTILLERY':
      _.fillStyle = gameConfiguration.factionsConfiguration[unit.faction].color
      _.beginPath()
      _.moveTo((x + 0.5) * tileSize, (y + 0.1) * tileSize)
      _.lineTo((x + 0.9) * tileSize, (y + 0.9) * tileSize)
      _.lineTo((x + 0.1) * tileSize, (y + 0.9) * tileSize)
      _.lineTo((x + 0.5) * tileSize, (y + 0.1) * tileSize)
      _.fill()
      _.stroke()

    if (unit.played) {
      _.fillStyle = 'black'
      _.globalAlpha = 0.5
      _.beginPath()
      _.moveTo((x + 0.5) * tileSize, (y + 0.1) * tileSize)
      _.lineTo((x + 0.9) * tileSize, (y + 0.9) * tileSize)
      _.lineTo((x + 0.1) * tileSize, (y + 0.9) * tileSize)
      _.lineTo((x + 0.5) * tileSize, (y + 0.1) * tileSize)
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
  _.fillRect((x + 0.55) * tileSize, (y + 0.8) * tileSize, 0.45 * tileSize, 0.2 * tileSize)
  _.fillStyle = 'black'
  _.fillText(unit.life, (x + 0.94) * tileSize, (y + 0.97) * tileSize)
}

export default draw
