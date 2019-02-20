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
    
    console.log('worldState', worldState)
    const hoveredUnit = units.find(unit => samePosition(unit.position, mouse))
    const scorePerFaction = computeWorldStateScore(worldState)

    return ( 
      <div className="DevPanel absolute">
        {mouse.x}, {mouse.y}
        {hoveredUnit && (<br />)}
        {hoveredUnit && (`${hoveredUnit.type} - ${computeUnitScore(worldState, hoveredUnit)}`)}
        <br />
          {Object.entries(scorePerFaction).map(([faction, score]) => (
            <div key={faction}>{faction} - {score}</div>
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
