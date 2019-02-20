import React, { Component } from 'react'
import { connect } from 'react-redux'

import './TurnInfo.css'

import gameConfiguration from '../lib/gameConfiguration'

class TurnInfo extends Component {

  handleNextPlayerClick = () => {
    const { selectedPosition, selectedUnitId, unitMenu, dispatch } = this.props

    if (unitMenu.awaitFireSelection) dispatch({ type: 'CANCEL_FIRE_SELECTION' })
    if (unitMenu.opened) dispatch({ type: 'CLOSE_UNIT_MENU' })
    if (selectedUnitId) dispatch({ type: 'DESELECT_UNIT_ID' })
    if (selectedPosition) dispatch({ type: 'DESELECT_POSITION' })

    dispatch({ type: 'END_PLAYER_TURN' })
  }

  render() {
    const { turn } = this.props

    return (
      <div className="TurnInfo absolute x4">
        <div style={{ marginRight: 10 }}>
          turn {turn.number} - {gameConfiguration.factionsConfiguration[turn.faction].name}
        </div>
        <button onClick={this.handleNextPlayerClick}>
          End Turn
        </button>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  selectedPosition: s.selectedPosition,
  selectedUnitId: s.selectedUnitId,
  turn: s.turn,
  unitMenu: s.unitMenu,
})

export default connect(mapStateToProps)(TurnInfo)
