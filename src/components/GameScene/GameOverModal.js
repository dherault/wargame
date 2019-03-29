import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import './GameOverModal.css'

class GameOverModal extends Component {

  render() {
    const { dispatch } = this.props

    return (
      <div className="GameOverModal absolute">
        <h1>Game over!</h1>
        <button type="button" onClick={() => dispatch(push('/'))}>Main menu</button>
      </div>
    )
  }
}

export default connect()(GameOverModal)
