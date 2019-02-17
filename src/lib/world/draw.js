import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'

function draw(_) {
  const { viewBox, worldMap } = store.getState()
  const { width, height } = _.canvas

  _.clearRect(0, 0, width, height)
  
  const tileSize = width / viewBox.width // pixel per tile
  const viewBoxHeight = Math.ceil(height / tileSize) // tiles

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
}

export default draw
