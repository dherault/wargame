import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import './InGameMenuModal.css'

class InGameMenuModal extends Component {

  render() {
    const { resume, dispatch } = this.props

    return (
      <div className="InGameMenuModal x5">
        <div className="InGameMenuModal-inner">
          <h1>Pause</h1>
          <button type="button" onClick={resume}>Resume game</button>
          <button type="button" onClick={() => dispatch(push('/'))}>Main menu</button>
        </div>
      </div>
    )
  }
}

export default connect()(InGameMenuModal)
