import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import gameConfiguration from '../../lib/gameConfiguration'
import createNewGame from '../../lib/game/createNewGame'
import prepareMap from '../../lib/game/prepareMap'

import './Mission.css'

const missionSize = 32 * 1.5

class Mission extends Component {

  handlePlayClick(mapDefinition) {
    const { dispatch } = this.props

    createNewGame(prepareMap(mapDefinition))

    dispatch(push('/game'))
  }

  handleSkipClick = () => {
    const { mission, onClick, dispatch } = this.props

    dispatch({
      type: 'COMPLETE_CAMPAIGN_MISSION',
      payload: mission.id,
    })

    onClick()
  }

  renderMissionBox() {
    const { mission } = this.props

    const mapDefinition = mission.getMapDefinition()

    return (
      <div className="Mission-box">
        <div className="Mission-box-title">{mapDefinition.name}</div>
        <div>
          <button type="button" onClick={() => this.handlePlayClick(mapDefinition)}>
            Play
          </button>
          <button type="button" onClick={this.handleSkipClick}>
            Skip
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { mission, active, selected, onClick } = this.props

    return (
      <div
        className="Mission x5"
        style={{
          width: missionSize,
          height: missionSize,
          top: `calc(${mission.position.y * 100}% - ${missionSize / 2}px)`,
          left: `calc(${mission.position.x * 100}% - ${missionSize / 2}px)`,
        }}
      >
        <img
          src={gameConfiguration.imageSources.campaignMenuSwords}
          className={`Mission-swords ${active ? 'Mission-swords_active' : ''}`}
          onClick={onClick}
          alt=""
        />
        {selected && this.renderMissionBox()}
      </div>
    )
  }
}

export default connect()(Mission)
