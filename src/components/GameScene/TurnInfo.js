import React, { Component } from 'react'
import { connect } from 'react-redux'
import hotkeys from 'piano-keys'

import './TurnInfo.css'

import gameConfiguration from '../../lib/gameConfiguration'

class TurnInfo extends Component {

  componentDidMount() {
    this.unregisterHotkeys = hotkeys(document.documentElement, 'space', this.handleEndTurnClick)
  }

  componentWillUnmount() {
    this.unregisterHotkeys()
  }

  handleEndTurnClick = () => {
    const { booleans, selectedPosition, selectedUnitId, dispatch } = this.props

    if (booleans.isFireSelection) {
      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isFireSelection: false,
        },
      })
    }

    if (booleans.isBuildingMenuOpened) {
      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isBuildingMenuOpened: false,
        },
      })
    }

    if (booleans.isUnitMenuOpened) {
      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isUnitMenuOpened: false,
        },
      })
    }

    if (selectedUnitId) {
      dispatch({ type: 'DESELECT_UNIT_ID' })
    }

    if (selectedPosition) {
      dispatch({ type: 'DESELECT_POSITION' })
    }

    dispatch({ type: 'END_PLAYER_TURN' })
    dispatch({ type: 'BEGIN_PLAYER_TURN' })
  }

  render() {
    const { turn, currentFaction, moneyByFaction } = this.props

    return (
      <div className="TurnInfo absolute x4">
        <div style={{ marginRight: 10 }}>
          turn {turn} - {gameConfiguration.factionsConfiguration[currentFaction.id].name} - {moneyByFaction[currentFaction.id]}$
        </div>
        <button type="button" onClick={this.handleEndTurnClick}>
          End Turn
        </button>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  booleans: s.booleans,
  currentFaction: s.currentFaction,
  moneyByFaction: s.moneyByFaction,
  selectedPosition: s.selectedPosition,
  selectedUnitId: s.selectedUnitId,
  turn: s.turn,
})

export default connect(mapStateToProps)(TurnInfo)
