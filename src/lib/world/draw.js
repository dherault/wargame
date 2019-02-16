import store from '../../state/store'
// import gameConfiguration from '../gameConfiguration'

function draw(_) {
  const { tileSize } = store.getState()

  _.clearRect(0, 0, _.canvas.width, _.canvas.height)
  
}

export default draw
