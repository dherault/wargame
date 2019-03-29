import store from '../../../state/store'
import gameConfiguration from '../../gameConfiguration'
import PolarPoint from '../PolarPoint'

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

  _.fillStyle = factionConfiguration ? factionConfiguration.color : gameConfiguration.terrainConfiguration[building.type].color
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

    case 'PORT':
      _.fillStyle = secondaryColor
      _.fillRect((x + 0.3) * tileSize + offsetX, (y + 0.3) * tileSize + offsetY, 0.4 * tileSize, 0.4 * tileSize)
      break

    case 'AIRPORT':
      _.fillStyle = secondaryColor
      _.beginPath()
      _.moveTo((x + 0.5) * tileSize + offsetX, (y + 0.3) * tileSize + offsetY)
      _.lineTo((x + 0.7) * tileSize + offsetX, (y + 0.7) * tileSize + offsetY)
      _.lineTo((x + 0.3) * tileSize + offsetX, (y + 0.7) * tileSize + offsetY)
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

export default drawBuilding
