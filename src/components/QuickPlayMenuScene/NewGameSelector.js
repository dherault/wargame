import React, { Component } from 'react'
import { connect } from 'react-redux'

import './NewGameSelector.css'

import { cloneArrayOfObjects } from '../../lib/common/utils'
import gameConfiguration from '../../lib/gameConfiguration'

class NewGameSelector extends Component {

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
    const { name, factions, isFogOfWar, handleIsFogOfWarChange, submit, edit, cancel } = this.props

    return (
      <div className="NewGameSelector x5">
        <div className="NewGameSelector-inner">
          <h2>{name}</h2>
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
          <div>
            <input type="checkbox" value={isFogOfWar} onChange={e => handleIsFogOfWarChange(e.target.checked)} />
            Fog of war
          </div>
          <button type="button" onClick={submit}>
            Go
          </button>
          <button type="button" onClick={edit}>
            Edit map
          </button>
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default connect()(NewGameSelector)
