import React, { Component } from 'react'
import { connect } from 'react-redux'

import World from './World'
import NewGameMenu from './NewGameMenu'

import './Game.css'

class Game extends Component {

  render() {
    const { worldMap } = this.props

    return (
      <div className="Game relative">
        {worldMap ? <World /> : <NewGameMenu />}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(Game)
