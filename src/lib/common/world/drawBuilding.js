import store from '../../../state/store'
import gameConfiguration from '../../gameConfiguration'

function drawBuilding(_, images, tileSize, building) {
  const { viewBox } = store.getState()
  const x = building.position.x - viewBox.x
  const y = building.position.y - viewBox.y
  const { offsetX, offsetY } = viewBox

  const backgroundImageSource = gameConfiguration.terrainConfiguration[building.type].tileBackgroundImageSources[gameConfiguration.factionsOrderForBackgroundImageSources.indexOf(building.factionId)]

  _.drawImage(
    images[backgroundImageSource],
    x * tileSize + offsetX,
    y * tileSize + offsetY,
    tileSize,
    tileSize
  )
}

export default drawBuilding
