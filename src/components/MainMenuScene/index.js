import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import './index.css'

import DevelopmentMapsGallery from './DevelopmentMapsGallery'

class MainMenuScene extends Component {

  handleMenuClick(menu) {

  }

  render() {
    const { selectedMenu, dispatch } = this.props
    return (
      <>
        {selectedMenu === null && (
          <div className="MainMenuScene">
            <div className="MainMenuScene-item" onClick={() => dispatch({ type: 'SELECT_MENU', payload: 'CAMPAIGN' })}>
              Campaign
            </div>
            <div className="MainMenuScene-item" onClick={() => dispatch({ type: 'SELECT_MENU', payload: 'DEVELOPMENT' })}>
              Development maps
            </div>
            <div className="MainMenuScene-item" onClick={() => dispatch(push('/editor'))}>
              Editor
            </div>
            <div className="MainMenuScene-item" onClick={() => window.open('https://github.com/dherault/wargame', '_blank')}>
              GitHub
            </div>
            <div className="MainMenuScene-item" onClick={window.reset}>
              Reset
            </div>
          </div>
        )}
        {selectedMenu === 'CAMPAIGN' && (
          <div>
            Campaign
          </div>
        )}
        {selectedMenu === 'DEVELOPMENT' && (
          <DevelopmentMapsGallery />
        )}
      </>
    )
  }
}

const mapStateToProps = s => ({
  selectedMenu: s.selectedMenu,
})

export default connect(mapStateToProps)(MainMenuScene)
