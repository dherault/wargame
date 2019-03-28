import computeAiActions from './computeAiActions'

onmessage = e => {
  console.log('WebWorker spanned and computing!', e.data.isNextTurn)

  postMessage(computeAiActions(e.data.state, e.data.isNextTurn))
}
