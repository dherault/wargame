import React, { Component } from 'react'
import { connect } from 'react-redux'

import './GameOverMenu.css'

class GameOverMenu extends Component {

  handleGoToMenuClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isPlaying: false,
      },
    })
  }

  render() {
    return (
      <div className="GameOverMenu absolute">
        <h1>Game over!</h1>
        <button type="button" onClick={this.handleGoToMenuClick}>Main menu</button>
      </div>
    )
  }
}

export default connect()(GameOverMenu)
