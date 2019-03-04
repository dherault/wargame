import store from '../../../state/store'
import gameConfiguration from '../../gameConfiguration'

function drawUnit(_, tileSize, unit) {
  const { viewBox } = store.getState()
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

export default drawUnit
