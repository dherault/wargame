import React, { Component } from 'react'

import './AppMenu.css'

class AppMenu extends Component {

  render() {
    return (
      <div className="AppMenu absolute x4">
        <button type="button" style={{ marginRight: 10 }} onClick={window.reset}>
          New Game
        </button>
        <button type="button" style={{ marginRight: 10 }}>
          Editor
        </button>
        <button type="button" onClick={() => window.open('https://github.com/dherault/wargame', '_blank')}>
          GitHub
        </button>
      </div>
    )
  }
}

export default AppMenu
