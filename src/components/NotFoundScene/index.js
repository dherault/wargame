import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFoundScene extends Component {

  render() {
    return (
      <div className="NotFoundScene">
        <h1>
          404 not found
        </h1>
        <Link to="/">Main menu</Link>
      </div>
    )
  }
}

export default NotFoundScene
