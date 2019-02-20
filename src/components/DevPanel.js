import React, { Component } from 'react'
import { connect } from 'react-redux'

import './DevPanel.css'

// import gameConfiguration from '../lib/gameConfiguration'
import { samePosition } from '../lib/utils'
import getWorldStateFromStore from '../lib/ai/getWorldStateFromStore'
import computeWorldStateScore, { computeUnitScore } from '../lib/ai/computeWorldStateScore'

class DevPanel extends Component {

  render() {
    const { mouse, units } = this.props
    const worldState = getWorldStateFromStore()
    const hoveredUnit = units.find(unit => samePosition(unit.position, mouse))
    const scorePerFaction = computeWorldStateScore(worldState)
    const scoreEntries = Object.entries(scorePerFaction)
    return ( 
      <div className="DevPanel absolute">
        {mouse.x}, {mouse.y}
        {hoveredUnit && (<br />)}
        {hoveredUnit && (`${hoveredUnit.type} - ${computeUnitScore(worldState, hoveredUnit)}`)}
        <br />
          {scoreEntries.map(([faction, score]) => (
            <div key={faction}>{faction} - {score} - {scoreEntries.filter(([f, s]) => f !== faction).reduce((a, b) => a + b[1], 0)}</div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  mouse: s.mouse,
  units: s.units
})

export default connect(mapStateToProps)(DevPanel)
