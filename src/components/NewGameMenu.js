import React, { Component } from 'react'
import { connect } from 'react-redux'

import maps from '../lib/maps'
import prepareMap from '../lib/game/prepareMap'
import createNewGame from '../lib/game/createNewGame'
import gameConfiguration from '../lib/gameConfiguration'

import './NewGameMenu.css'

import FactionTypeSelector from './FactionTypeSelector'

class NewGameMenu extends Component {

  state = {
    selectedMapDefinition: null,
  }

  updateSelectedMapDefinitionFactions = factions => {
    const { selectedMapDefinition } = this.state

    console.log('factions', factions)
    this.setState({
      selectedMapDefinition: {
        ...selectedMapDefinition,
        factions,
      },
    })
  }

  handleFactionTypeSelectorSubmit = () => {
    const { selectedMapDefinition } = this.state

    createNewGame(prepareMap(selectedMapDefinition))
  }

  handleFactionTypeSelectorCancel = () => {
    this.setState({
      selectedMapDefinition: null,
    })
  }

  createWorldMapMiniature(worldMap) {
    return (
      <div>
        {worldMap.map((row, j) => (
          <div key={j} className="x4">
            {row.map((tile, i) => (
              <div 
                key={i}
                className="NewGameMenu-tile"
                style={{ backgroundColor: gameConfiguration.terrainConfiguration[tile].color }}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { selectedMapDefinition } = this.state

    return (
      <div className="NewGameMenu x5 relative">
        <div className="NewGameMenu-inner">
          <h1>New Game</h1>
          <div className="x77">
            {maps.map((mapDefinition, i) => (
              <div 
                key={i} 
                onClick={() => this.setState({ selectedMapDefinition: mapDefinition })}
                className="NewGameMenu-item y8"
              >
                <div>{mapDefinition.name}</div>
                <div>{this.createWorldMapMiniature(mapDefinition.worldMap)}</div>
                <div>{mapDefinition.description}</div>
              </div>
            ))}
          </div>
        </div>
        {selectedMapDefinition && (
          <FactionTypeSelector 
            factions={selectedMapDefinition.factions} 
            updateFactions={this.updateSelectedMapDefinitionFactions}
            submit={this.handleFactionTypeSelectorSubmit}
            cancel={this.handleFactionTypeSelectorCancel}
          />
        )}
      </div>
    )
  }
}

export default connect()(NewGameMenu)
