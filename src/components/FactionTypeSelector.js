import React, { Component } from 'react'
import { connect } from 'react-redux'

import './FactionTypeSelector.css'

import { cloneArrayOfObjects } from '../lib/common/utils'
import gameConfiguration from '../lib/gameConfiguration'

class FactionTypeSelector extends Component {

  handleFactionChange(factionId, payload) {
    const { factions, updateFactions } = this.props

    const nextFactions = cloneArrayOfObjects(factions)
    const factionIndex = nextFactions.findIndex(faction => faction.id === factionId)

    nextFactions[factionIndex] = {
      ...nextFactions[factionIndex],
      ...payload,
    }

    updateFactions(nextFactions)
  }

  render() {
    const { factions, submit, cancel } = this.props

    return (
      <div className="FactionTypeSelector x5">
        <div className="FactionTypeSelector-inner">
          <ul>
            {factions.map(faction => (
              <li key={faction.id}>
                {gameConfiguration.factionsConfiguration[faction.id].name}:
                <select value={faction.type} onChange={e => this.handleFactionChange(faction.id, { type: e.target.value })}>
                  <option value="HUMAN">Human</option>
                  <option value="COMPUTER">Computer</option>
                </select>
                <select value={faction.team} onChange={e => this.handleFactionChange(faction.id, { team: parseInt(e.target.value) })}>
                  {[1, 2, 3, 4].map(team => (
                    <option key={team} value={team}>Team {team}</option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
          <button type="button" onClick={submit}>
            Go
          </button>
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default connect()(FactionTypeSelector)
