import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

// import campaignTree from '../../lib/game/campaignTree'

import './index.css'

class CampaignMenuScene extends Component {

  render() {
    const { dispatch } = this.props

    return (
      <div className="CampaignMenuScene relative">
        <div className="CampaignMenuScene-container x5">
          <img src="/images/map-full-remastered.png" className="CampaignMenuScene-container-background" />
        </div>
        <div className="CampaignMenyScene-return" onClick={() => dispatch(push('/'))}>
          Return
        </div>
      </div>
    )
  }
}

export default connect()(CampaignMenuScene)
