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

  renderMap(mapDefinition, key) {
    return (
      <div 
        key={key} 
        onClick={() => this.setState({ selectedMapDefinition: mapDefinition })}
        className="NewGameMenu-item y8"
      >
        <div>{mapDefinition.name}</div>
        <div>{this.renderWorldMapMiniature(mapDefinition.worldMap)}</div>
        <div>{mapDefinition.description}</div>
      </div>
    )
  }

  renderWorldMapMiniature(worldMap) {
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
    const { userMapDefinitions } = this.props
    const { selectedMapDefinition } = this.state

    return (
      <div className="NewGameMenu x5 relative">
        <div className="NewGameMenu-inner">
          <h1>New Game</h1>
          {userMapDefinitions.length && (
            <div>
              <h2>User created maps</h2>
              <div className="x77">
                {userMapDefinitions.map((mapDefinition, i) => this.renderMap(mapDefinition, i))}
              </div>
            </div>
          )}
          <div>
            <h2>Development Maps</h2>
            <div className="x77">
              {maps.map((mapDefinition, i) => this.renderMap(mapDefinition, i))}
            </div>
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

const mapStateToProps = s => ({
  userMapDefinitions: s.userMapDefinitions,
})

export default connect(mapStateToProps)(NewGameMenu)
