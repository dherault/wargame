import React, { Component } from 'react'
import { connect } from 'react-redux'

import './DevPanel.css'

// import gameConfiguration from '../lib/gameConfiguration'
import store from '../state/store'
import { samePosition } from '../lib/common/utils'
import computeWorldStateScore, { computeUnitScore } from '../lib/ai/computeWorldStateScore'

class DevPanel extends Component {

  render() {
    const { mouse, units } = this.props
    const hoveredUnit = units.find(unit => samePosition(unit.position, mouse))
    const scorePerFaction = computeWorldStateScore(store)
    const scoreEntries = Object.entries(scorePerFaction)
    
    return ( 
      <div className="DevPanel absolute">
        {mouse.x}, {mouse.y}
        {hoveredUnit && (<br />)}
        {hoveredUnit && (`${hoveredUnit.type}: ${computeUnitScore(hoveredUnit)}`)}
        <br />
        {scoreEntries.map(([factionId, score]) => (
          <div key={factionId}>{factionId}: {score}</div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  mouse: s.mouse,
  units: s.units,
})

export default connect(mapStateToProps)(DevPanel)
