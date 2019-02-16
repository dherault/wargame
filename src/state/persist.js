export function loadState() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState) return JSON.parse(serializedState)
  }
  catch (error) {
    console.error(error)
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  }
  catch (error) {
    console.error(error)
  }
}
