// Loads the state from localStorage
export function loadState() {
  try {
    const serializedState = localStorage.getItem('basicwars-state')

    if (serializedState) {
      return JSON.parse(serializedState)
    }
  }
  catch (error) {
    console.error(error)
  }
}

// Saves the state into localStorage
export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem('basicwars-state', serializedState)
  }
  catch (error) {
    console.error(error)
  }
}

// A utility to call from the browser's console when everything seems to fall apart
window.reset = () => {
  localStorage.removeItem('basicwars-state')
  window.location.reload()

  return 'Roll \'em dices baby!'
}
