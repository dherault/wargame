import store from '../state/store'
import gameConfiguration from './gameConfiguration'
import computeMovementTiles from './units/computeMovementTiles'

const unitsDrawers = {
  INFANTERY(_, tileSize, x, y, color) {
    _.fillStyle = color
    _.strokeStyle = '#333333'
    _.lineWidth = 2

    _.beginPath()
    _.arc((x + 0.5) * tileSize, (y + 0.5) * tileSize, 0.4 * tileSize, 0, 2 * Math.PI)
    _.closePath()
    _.fill()
    _.stroke()
  },
  TANK(_, tileSize, x, y, color) {
    _.fillStyle = color
    _.strokeStyle = '#333333'
    _.lineWidth = 2

    _.beginPath()
    _.rect((x + 0.1) * tileSize, (y + 0.1) * tileSize, 0.8 * tileSize, 0.8 * tileSize)
    _.closePath()
    _.fill()
    _.stroke()
  }
}

function draw(_) {
  const { viewBox, mouse, worldMap, units } = store.getState()
  const { width, height } = _.canvas

  _.clearRect(0, 0, width, height)
  
  const tileSize = width / viewBox.width // pixel per tile
  const viewBoxHeight = Math.ceil(height / tileSize) // tiles
  const mouseX = Math.floor(mouse.offsetX / tileSize + viewBox.x)
  const mouseY = Math.floor(mouse.offsetY / tileSize + viewBox.y)

  for (let j = 0; j < viewBoxHeight + 1; j++) { // + 1 for move draw
    const y = Math.floor(j + viewBox.y)

    for (let i = 0; i < viewBox.width + 1; i++) {
      const tile = worldMap[y] && worldMap[y][Math.floor(i + viewBox.x)]

      if (!tile) continue 

      _.fillStyle = gameConfiguration.tilesConfiguration[tile.type].color
      _.fillRect(
        (i - (viewBox.x % 1)) * tileSize,
        (j - (viewBox.y % 1)) * tileSize,
        tileSize,
        tileSize
      )
    }
  }

  units.forEach(unit => {
    unitsDrawers[unit.type](
      _, 
      tileSize, 
      unit.position.x - viewBox.x, 
      unit.position.y - viewBox.y, 
      gameConfiguration.factionsConfiguration[unit.faction].color
    )
  }) 

  if (mouse.rightButtonDown) {
    const rightClickedUnit = units.find(unit => unit.position.x === mouseX && unit.position.y === mouseY)

    if (rightClickedUnit) {
      const movementTiles = computeMovementTiles(rightClickedUnit.position, rightClickedUnit.type)
      
      _.globalAlpha = 0.5
      _.fillStyle = '#12e242'

      movementTiles.forEach(tile => {
        _.fillRect(
          (tile.x - viewBox.x) * tileSize,
          (tile.y - viewBox.y) * tileSize,
          tileSize,
          tileSize
        )
      })
      
      _.globalAlpha = 1
    }
  }
}

export default draw
