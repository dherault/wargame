import React, { Component } from 'react'
import { connect } from 'react-redux'

import './DevPanel.css'

// import gameConfiguration from '../lib/gameConfiguration'
import store from '../state/store'
import { samePosition } from '../lib/common/utils'
import computeWorldStateScore, { computeUnitScore } from '../lib/ai/computeWorldStateScore'

class DevPanel extends Component {

  handleBooleanClick(boolean) {
    const { booleans, dispatch } = this.props

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        [boolean]: !booleans[boolean],
      },
    })
  }

  render() {
    const { booleans, mouse, units } = this.props
    const hoveredUnit = units.find(unit => samePosition(unit.position, mouse))
    const scorePerFaction = computeWorldStateScore(store)
    const scoreEntries = Object.entries(scorePerFaction)
    
    return ( 
      <div className="DevPanel absolute">
        {booleans.isAiComputing && (
          <div>Ai is computing...</div>
        )}
        <div>
          {mouse.x}, {mouse.y}
        </div>
        {hoveredUnit && (
          <div>
            {`${hoveredUnit.type}: ${computeUnitScore(hoveredUnit)}`}
          </div>
        )}
        {scoreEntries.map(([factionId, score]) => (
          <div key={factionId}>{factionId}: {score}</div>
        ))}
        <div className="x1 no-select" onClick={() => this.handleBooleanClick('preventAutoZoom')}>
          <input readOnly type="checkbox" checked={booleans.preventAutoZoom} /> preventAutoZoom
        </div>
        <div className="x1 no-select" onClick={() => this.handleBooleanClick('delayComputerActions')}>
          <input readOnly type="checkbox" checked={booleans.delayComputerActions} /> delayComputerActions
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  booleans: s.booleans,
  mouse: s.mouse,
  units: s.units,
})

export default connect(mapStateToProps)(DevPanel)
