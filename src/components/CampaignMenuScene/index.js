import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import gameConfiguration from '../../lib/gameConfiguration'
import campaignTree from '../../lib/campaignMenu/campaignTree'

import './index.css'

import Mission from './Mission'
import MissionEdge from './MissionEdge'

class CampaignMenuScene extends Component {

  render() {
    const { completedCampaignMissionIds, dispatch } = this.props

    const missions = []
    const missionEdges = []

    campaignTree.traverseDown((index, parentIndex) => {
      const mission = campaignTree.getData(index)
      const parentMission = campaignTree.getData(parentIndex)

      if (!parentMission || completedCampaignMissionIds.includes(parentMission.id)) {
        missions.push(
          <Mission
            key={mission.id}
            mission={mission}
            active={!completedCampaignMissionIds.includes(mission.id)}
          />
        )

        if (parentMission) {
          missionEdges.push(
            <MissionEdge
              key={mission.id}
              positions={[mission.position, parentMission.position]}
            />
          )
        }
      }
    })

    return (
      <div className="CampaignMenuScene">
        <div className="CampaignMenuScene-container x5">
          <div className="relative">
            <img
              src={gameConfiguration.imageSources.campaignMenuBackground}
              className="CampaignMenuScene-container-background"
              alt=""
            />
            {missionEdges}
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
  completedCampaignMissionIds: s.completedCampaignMissionIds,
})

export default connect(mapStateToProps)(CampaignMenuScene)
