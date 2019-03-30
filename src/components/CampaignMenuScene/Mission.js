import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import gameConfiguration from '../../lib/gameConfiguration'
import createNewGame from '../../lib/game/createNewGame'
import prepareMap from '../../lib/game/prepareMap'

import './Mission.css'

const missionSize = 32 * 1.5

class Mission extends Component {

  ref = React.createRef()

  state = {
    toggled: false,
  }

  componentDidMount() {
    this.clickListener = e => {
      const { toggled } = this.state

      if (toggled && !this.ref.current.contains(e.target)) {
        this.setState({ toggled: false })
      }
    }

    document.addEventListener('click', this.clickListener)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickListener)
  }

  handlePlayClick(mapDefinition) {
    const { dispatch } = this.props

    createNewGame(prepareMap(mapDefinition))

    dispatch(push('/game'))
  }

  handleSkipClick = () => {
    const { mission, dispatch } = this.props

    dispatch({
      type: 'COMPLETE_CAMPAIGN_MISSION',
      payload: mission.id,
    })

    this.setState({ toggled: false })
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
    const { mission, active } = this.props
    const { toggled } = this.state

    return (
      <div
        className="Mission x5"
        style={{
          width: missionSize,
          height: missionSize,
          top: `calc(${mission.position.y * 100}% - ${missionSize / 2}px)`,
          left: `calc(${mission.position.x * 100}% - ${missionSize / 2}px)`,
        }}
        ref={this.ref}
      >
        <img
          src={gameConfiguration.imageSources.campaignMenuSwords}
          className={`Mission-swords ${active ? 'Mission-swords_active' : ''}`}
          onClick={() => this.setState(state => ({ toggled: !state.toggled }))}
          alt=""
        />
        {toggled && this.renderMissionBox()}
      </div>
    )
  }
}

export default connect()(Mission)
