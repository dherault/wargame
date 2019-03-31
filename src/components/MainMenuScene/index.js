import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import './index.css'

import version from '../../version.json'

class MainMenuScene extends Component {

  render() {
    const { dispatch } = this.props

    return (
      <div className="MainMenuScene text-align-center relative">
        <h1 className="gold">
          Basic Wars
        </h1>
        <div className="MainMenuScene-item" onClick={() => dispatch(push('/campaign'))}>
          Campaign
        </div>
        <div className="MainMenuScene-item" onClick={() => dispatch(push('/quick_play'))}>
          Quick play
        </div>
        <div className="MainMenuScene-item" onClick={() => dispatch(push('/editor'))}>
          Editor
        </div>
        <div className="MainMenuScene-item" onClick={() => window.open('https://github.com/dherault/wargame', '_blank')}>
          GitHub
        </div>
        <div className="MainMenuScene-item" onClick={window.reset}>
          Clear data storage
        </div>
        <div className="MainMenuScene-version">
          Version {version.version}
        </div>
      </div>
    )
  }
}

export default connect()(MainMenuScene)
