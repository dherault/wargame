import computeAiActions from './computeAiActions'

onmessage = e => {
  console.log('WebWorker spanned and computing!')

  postMessage(computeAiActions(e.data))
}
