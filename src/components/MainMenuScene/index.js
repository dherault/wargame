import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import './index.css'

import QuickPlayMenu from './QuickPlayMenu'

class MainMenuScene extends Component {

  render() {
    const { selectedMenu, dispatch } = this.props
    return (
      <>
        {selectedMenu === null && (
          <div className="MainMenuScene">
            <h1>
              Basic Wars
            </h1>
            <div className="MainMenuScene-item" onClick={() => dispatch({ type: 'SELECT_MENU', payload: 'CAMPAIGN' })}>
              Campaign
            </div>
            <div className="MainMenuScene-item" onClick={() => dispatch({ type: 'SELECT_MENU', payload: 'QUICK_PLAY' })}>
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
          </div>
        )}
        {selectedMenu === 'CAMPAIGN' && (
          <div>
            Campaign
          </div>
        )}
        {selectedMenu === 'QUICK_PLAY' && (
          <QuickPlayMenu />
        )}
      </>
    )
  }
}

const mapStateToProps = s => ({
  selectedMenu: s.selectedMenu,
})

export default connect(mapStateToProps)(MainMenuScene)
