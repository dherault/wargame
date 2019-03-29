import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import './InGameMenuModal.css'

class InGameMenuModal extends Component {

  ref = React.createRef()

  handleContainerClick = e => {
    if (!this.ref.current.contains(e.target)) {
      const { resume } = this.props

      resume()
    }
  }

  render() {
    const { resume, dispatch } = this.props

    return (
      <div className="InGameMenuModal x5" onClick={this.handleContainerClick}>
        <div className="InGameMenuModal-inner" ref={this.ref}>
          <h1>Pause</h1>
          <button type="button" onClick={resume}>Resume game</button>
          <button type="button" onClick={() => dispatch(push('/'))}>Main menu</button>
        </div>
      </div>
    )
  }
}

export default connect()(InGameMenuModal)
