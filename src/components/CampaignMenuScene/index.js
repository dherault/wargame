import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import gameConfiguration from '../../lib/gameConfiguration'
import campaignTree from '../../lib/campaignMenu/campaignTree'

import './index.css'

import Mission from './Mission'

class CampaignMenuScene extends Component {

  render() {
    const { dispatch } = this.props
    
    const missions = []

    campaignTree.traverseDown((index, parentIndex) => {
      const mission = campaignTree.getData(index)

      missions.push(
        <Mission key={mission.id} mission={mission} />
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

export default connect()(CampaignMenuScene)
