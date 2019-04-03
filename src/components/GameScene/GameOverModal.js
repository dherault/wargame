import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import gameConfiguration from '../../lib/gameConfiguration'
import { getRemainingTeams } from '../../lib/common/helpers'

import './GameOverModal.css'

const GameOverModal = ({ units, buildings, factions, dispatch }) => {
  const remainingTeams = getRemainingTeams(buildings, units)
  const winningFactions = factions
    .filter(faction => remainingTeams.includes(faction.team))
    .map(faction => gameConfiguration.factionsConfiguration[faction.id].name)

  return (
    <div className="GameOverModal absolute">
      <h1>Game over!</h1>
      <div>
        {winningFactions.join(' and ')} win{winningFactions.length === 1 ? 's' : ''}
      </div>
      <button type="button" onClick={() => dispatch(push('/'))}>Main menu</button>
    </div>
  )
}

const mapStateToProps = s => ({
  buildings: s.buildings,
  units: s.units,
  factions: s.factions,
})

export default connect(mapStateToProps)(GameOverModal)
