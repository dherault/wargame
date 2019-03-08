import store from '../../../state/store'
import gameConfiguration from '../../gameConfiguration'

const unitImageTileWidth = 61
const unitImageTileHeight = 61

function drawUnit(_, tileSize, images, unit) {
  const { viewBox } = store.getState()
  const x = unit.position.x - viewBox.x 
  const y = unit.position.y - viewBox.y
  const { offsetX, offsetY } = viewBox
  const image = images[gameConfiguration.unitsImageSource]
  const imageDy = gameConfiguration.factionsConfiguration[unit.factionId].unitsImageDy
  const { unitsImageDx: dx, unitsImageDy: dy } = gameConfiguration.unitsConfiguration[unit.type]

  _.fillStyle = gameConfiguration.factionsConfiguration[unit.factionId].color
  _.strokeStyle = '#333333'
  _.lineWidth = 2

  _.drawImage(
    unit.played ? images[gameConfiguration.playedUnitsImageSource] : images[gameConfiguration.unitsImageSource], 
    dx + 2, 
    dy + imageDy + 2, 
    unitImageTileWidth, 
    unitImageTileHeight, 
    x * tileSize + offsetX, 
    y * tileSize + offsetY, 
    tileSize, 
    tileSize
  )

  _.font = `bold ${tileSize / 5}px lato`
  _.textAlign = 'right'
  _.textBaseline = 'alphabetic'
  _.fillStyle = 'white'
  _.fillRect((x + 0.55) * tileSize + offsetX, (y + 0.8) * tileSize + offsetY, 0.45 * tileSize, 0.2 * tileSize)
  _.fillStyle = 'black'
  _.fillText(unit.life, (x + 0.94) * tileSize + offsetX, (y + 0.97) * tileSize + offsetY)

  // if (process.env.NODE_ENV !== 'production') {
  //   _.font = `bold ${tileSize / 3}px lato`
  //   _.textAlign = 'center'
  //   _.textBaseline = 'middle'
  //   _.fillStyle = 'white'
  //   _.fillText(unit.id.slice(0, 3), (x + 0.5) * tileSize + offsetX, (y + 0.5) * tileSize + offsetY)
  // }

}

export default drawUnit
