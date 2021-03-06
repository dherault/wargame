import store from '../../../state/store'
import gameConfiguration from '../../gameConfiguration'

function drawUnit(_, tileSize, images, unit) {
  const { viewBox, booleans: { isDevPanelOpened } } = store.getState()
  const position = unit.currentPosition || unit.position
  const x = position.x - viewBox.x
  const y = position.y - viewBox.y
  const { offsetX, offsetY } = viewBox
  const factionDy = gameConfiguration.factionsConfiguration[unit.factionId].unitsImageDy
  const { unitsImageDx: dx, unitsImageDy: dy } = gameConfiguration.unitsConfiguration[unit.type]

  _.fillStyle = gameConfiguration.factionsConfiguration[unit.factionId].color
  _.strokeStyle = '#333333'
  _.lineWidth = 2

  const flipped = !unit.flipped

  _.save()

  if (flipped) {
    _.scale(-1, 1)
  }

  _.drawImage(
    unit.played ? images[gameConfiguration.imageSources.playedUnits] : images[gameConfiguration.imageSources.units],
    dx,
    dy + factionDy,
    gameConfiguration.imageTileDimensions.units.width,
    gameConfiguration.imageTileDimensions.units.height,
    flipped ? -((x + 1) * tileSize + offsetX) : x * tileSize + offsetX,
    y * tileSize + offsetY,
    tileSize,
    tileSize
  )

  _.restore()

  // Draw life amount
  if (typeof unit.life === 'number' && unit.life !== gameConfiguration.maxUnitLife) {
    _.font = `bold ${tileSize / 4}px lato`
    _.textAlign = 'right'
    _.textBaseline = 'alphabetic'
    _.fillStyle = 'white'
    _.strokeStyle = 'black'
    _.lineWidth = 4
    _.strokeText(unit.life, (x + 0.9) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
    _.fillText(unit.life, (x + 0.9) * tileSize + offsetX, (y + 0.9) * tileSize + offsetY)
  }

  if (isDevPanelOpened) {
    _.font = `bold ${tileSize / 4}px lato`
    _.textAlign = 'center'
    _.textBaseline = 'middle'
    _.fillStyle = 'white'
    _.strokeStyle = 'black'
    _.lineWidth = 4
    _.strokeText(unit.id.toString().slice(0, 5), (x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
    _.fillText(unit.id.toString().slice(0, 5), (x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
  }
}

export default drawUnit
