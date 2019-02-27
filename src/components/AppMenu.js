import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import './AppMenu.css'

class AppMenu extends Component {

  render() {
    const { dispatch } = this.props

    return (
      <div className="AppMenu absolute x4">
        <button type="button" style={{ marginRight: 10 }} onClick={window.reset}>
          New Game
        </button>
        <button type="button" style={{ marginRight: 10 }} onClick={() => dispatch(push('/editor'))}>
          Editor
        </button>
        <button type="button" onClick={() => window.open('https://github.com/dherault/wargame', '_blank')}>
          GitHub
        </button>
      </div>
    )
  }
}

export default connect()(AppMenu)
