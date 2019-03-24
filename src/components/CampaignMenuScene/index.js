import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import gameConfiguration from '../../lib/gameConfiguration'
import campaignTree from '../../lib/campaignMenu/campaignTree'

import './index.css'

import Mission from './Mission'

class CampaignMenuScene extends Component {

  state = {
    selectedMissionId: null,
  }

  render() {
    const { campaignProgression, dispatch } = this.props
    const { selectedMissionId } = this.state
    
    const missions = []

    campaignTree.traverseDown((index, parentIndex) => {
      const mission = campaignTree.getData(index)
      const progression = campaignProgression[mission.id] || {}

      missions.push(
        <Mission 
          key={mission.id} 
          mission={mission} 
          active={!progression.done}
          selected={selectedMissionId === mission.id}
          onClick={() => this.setState({ selectedMissionId: selectedMissionId === mission.id ? null : mission.id })}
        />
      )
    })

    return (
      <div className="CampaignMenuScene">
        <div className="CampaignMenuScene-container x5">
          <div className="relative">
            <img src={gameConfiguration.imageSources.campaignMenuBackground} className="CampaignMenuScene-container-background" />
            {missions} 
          </div>
        </div>
        <div className="CampaignMenyScene-return" onClick={() => dispatch(push('/'))}>
          Return
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  campaignProgression: s.campaignProgression,
})

export default connect(mapStateToProps)(CampaignMenuScene)
