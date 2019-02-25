import React, { Component } from 'react'
import { connect } from 'react-redux'

import maps from '../lib/world/maps'

import './NewGameMenu.css'
import createNewGame from '../lib/createNewGame'
import gameConfiguration from '../lib/gameConfiguration'

class NewGameMenu extends Component {

  handleMapClick(mapDefinition) {
    createNewGame(mapDefinition)
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
                style={{ backgroundColor: gameConfiguration.terrainConfiguration[tile].color}}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="NewGameMenu x5">
        <div className="NewGameMenu-inner">
          <h1>New Game</h1>
          <div className="x77">
            {maps.map((mapDefinition, i) => (
              <div 
                key={i} 
                onClick={() => this.handleMapClick(mapDefinition)}
                className="NewGameMenu-item y8"
              >
                <div>{mapDefinition.name}</div>
                <div>{this.createWorldMapMiniature(mapDefinition.worldMap)}</div>
                <div>{mapDefinition.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(NewGameMenu)
