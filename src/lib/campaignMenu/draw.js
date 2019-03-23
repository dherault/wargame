// import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import loadImages from '../common/loadImages'
import campaignTree from './campaignTree'

const imagesSources = [
  gameConfiguration.imageSources.campaignMenuBackground,
  gameConfiguration.imageSources.campaignMenuSwords,
]

// The main draw function for the editor
function draw(_) {
  // const { viewBox, mouse, booleans, worldMap, buildings, units, selectedTerrainType, selectedBuildingType, selectedUnitType, selectedFactionId, selectedPosition } = store.getState()
  const { width, height } = _.canvas

  _.fillStyle = '#b8c6c6'
  _.fillRect(0, 0, width, height)

  loadImages(imagesSources).then(images => {

    /* ----------------
      DRAW BACKGROUND
    ---------------- */

    const backgroundImage = images[gameConfiguration.imageSources.campaignMenuBackground]
    const backgroundImageHeight = width * backgroundImage.height / backgroundImage.width

    _.drawImage(
      backgroundImage,
      0,
      (height - backgroundImageHeight) / 2, 
      width,
      backgroundImageHeight
    )

    /* -------------------
      DRAW CAMPAIGN TREE
    ------------------- */

    campaignTree.traverseDown((index, parentIndex) => {
      const data = campaignTree.getData(index)

      _.drawImage(
        images[gameConfiguration.imageSources.campaignMenuSwords],
        data.position.x,
        data.position.y,
        32,
        32,
      )

      if (parentIndex !== null) {
        // const parentData = campaignTree.getData(parentIndex)

      }
    })
  })
}

export default draw
