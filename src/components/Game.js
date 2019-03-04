import React, { Component } from 'react'
import { connect } from 'react-redux'

import GameWorld from './GameWorld'
import NewGameMenu from './NewGameMenu'

import './Game.css'

class Game extends Component {

  render() {
    const { isPlaying } = this.props

    return (
      <div className="Game relative">
        {isPlaying ? <GameWorld /> : <NewGameMenu />}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  isPlaying: s.booleans.isPlaying,
})

export default connect(mapStateToProps)(Game)
