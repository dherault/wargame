import store from '../../../state/store'
import gameConfiguration from '../../gameConfiguration'
import loadImages from '../../common/loadImages'

const imagesSources = [
  gameConfiguration.imageSources.attackAnimationBackgrounds,
  gameConfiguration.imageSources.units,
]

// const steps = ['move', 'fire', 'counter']

let moveAnimationStep = 0

// The main draw function for the game
function draw(_) {
  const { attackAnimationParameters } = store.getState()
  const { width, height } = _.canvas

  if (!attackAnimationParameters) return

  const { step } = attackAnimationParameters

  if (step === 'MOVE') moveAnimationStep++

  _.fillStyle = 'black'
  _.fillRect(0, 0, width, height)

  loadImages(imagesSources).then(images => {
    const { leftBackgroundTileOffset, rightBackgroundTileOffset, leftUnit, rightUnit } = attackAnimationParameters

    /* ----------------
      DRAW BACKGROUND
    ---------------- */

    const backgroundImageWidth = (width - gameConfiguration.attackAnimationSeparatorWidth) / 2

    _.save()
    _.scale(-1, 1)
    _.drawImage(
      images[gameConfiguration.imageSources.attackAnimationBackgrounds],
      leftBackgroundTileOffset.x,
      leftBackgroundTileOffset.y,
      gameConfiguration.imageTileDimensions.attackAnimationBackgrounds.width,
      gameConfiguration.imageTileDimensions.attackAnimationBackgrounds.height,
      -backgroundImageWidth,
      0,
      backgroundImageWidth,
      height
    )
    _.restore()

    _.drawImage(
      images[gameConfiguration.imageSources.attackAnimationBackgrounds],
      rightBackgroundTileOffset.x,
      rightBackgroundTileOffset.y,
      gameConfiguration.imageTileDimensions.attackAnimationBackgrounds.width,
      gameConfiguration.imageTileDimensions.attackAnimationBackgrounds.height,
      width - backgroundImageWidth,
      0,
      backgroundImageWidth,
      height
    )

    /* ----------
      DRAW LIFE
    ---------- */

    // _.font = 'bold 60px lato'
    // _.textAlign = 'center'
    // _.textBaseline = 'middle'
    // _.fillStyle = 'white'
    // _.strokeStyle = 'black'
    // _.lineWidth = 4
    // _.strokeText(leftUnit.life, backgroundImageWidth / 2, 72)
    // _.fillText(leftUnit.life, backgroundImageWidth / 2, 72)

    // _.font = 'bold 60px lato'
    // _.textAlign = 'center'
    // _.textBaseline = 'middle'
    // _.fillStyle = 'white'
    // _.strokeStyle = 'black'
    // _.lineWidth = 4
    // _.strokeText(rightUnit.life, backgroundImageWidth * 3 / 2 + gameConfiguration.attackAnimationSeparatorWidth, 72)
    // _.fillText(rightUnit.life, backgroundImageWidth * 3 / 2 + gameConfiguration.attackAnimationSeparatorWidth, 72)

    /* -----------
      DRAW UNITS
    ----------- */

    let factionDy = gameConfiguration.factionsConfiguration[leftUnit.factionId].unitsImageDy
    let { unitsImageDx: dx, unitsImageDy: dy } = gameConfiguration.unitsConfiguration[leftUnit.type]

    _.save()
    _.scale(-1, 1)
    _.drawImage(
      images[gameConfiguration.imageSources.units],
      dx,
      dy + factionDy,
      gameConfiguration.imageTileDimensions.units.width,
      gameConfiguration.imageTileDimensions.units.height,
      -(10 + 200),
      0.5 * height,
      200,
      200
    )
    _.restore()
    _.beginPath()
    _.arc(50, 0.7 * height, 3, 0, 2 * Math.PI)
    _.closePath()
    _.fill()
  })
}

export default draw
