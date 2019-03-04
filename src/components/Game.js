import React, { Component } from 'react'
import { connect } from 'react-redux'

import World from './World'
import NewGameMenu from './NewGameMenu'

import './Game.css'

class Game extends Component {

  render() {
    const { currentFaction } = this.props

    return (
      <div className="Game relative">
        {currentFaction ? <World /> : <NewGameMenu />}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  currentFaction: s.currentFaction,
})

export default connect(mapStateToProps)(Game)
