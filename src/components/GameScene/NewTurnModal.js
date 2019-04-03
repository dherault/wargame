import React from 'react'
import { connect } from 'react-redux'

import './NewTurnModal.css'

import gameConfiguration from '../../lib/gameConfiguration'

const NewTurnModal = ({ turn, currentFaction }) => {
  if (!currentFaction) return null

  return (
    <div className="NewTurnModal x5">
      <div className="NewTurnModal-inner">
        Turn {turn} - {gameConfiguration.factionsConfiguration[currentFaction.id].name}
      </div>
    </div>
  )
}

const mapStateToProps = s => ({
  currentFaction: s.currentFaction,
  turn: s.turn,
})

export default connect(mapStateToProps)(NewTurnModal)
