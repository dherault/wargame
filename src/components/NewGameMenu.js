import React, { Component } from 'react'
import { connect } from 'react-redux'

import maps from '../lib/maps'
import prepareMap from '../lib/game/prepareMap'
import createNewGame from '../lib/game/createNewGame'
import gameConfiguration from '../lib/gameConfiguration'
import { samePosition } from '../lib/common/utils'

import './NewGameMenu.css'

import NewGameSelector from './NewGameSelector'

class NewGameMenu extends Component {

  state = {
    selectedMapDefinition: null,
    isFogOfWar: false,
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

  handleNewGameSelectorSubmit = () => {
    const { selectedMapDefinition, isFogOfWar } = this.state

    createNewGame(prepareMap(selectedMapDefinition), isFogOfWar)
  }

  handleNewGameSelectorCancel = () => {
    this.setState({
      selectedMapDefinition: null,
      isFogOfWar: false,
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
        <div>{this.renderWorldMapMiniature(mapDefinition)}</div>
        <div>{mapDefinition.description}</div>
      </div>
    )
  }

  renderWorldMapMiniature({ worldMap, buildings }) {
    return (
      <div>
        {worldMap.map((row, j) => (
          <div key={j} className="x4">
            {row.map((tile, i) => {
              let { color } = gameConfiguration.terrainConfiguration[tile]

              if (gameConfiguration.buildingTerrainTypes.includes(tile)) {
                const { factionId } = buildings.find(building => samePosition(building.position, { x: i, y: j }))

                if (factionId !== null) {
                  ({ color } = gameConfiguration.factionsConfiguration[factionId])
                }
              }

              return (
                <div 
                  key={i}
                  className="NewGameMenu-tile"
                  style={{ backgroundColor: color }}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { userMapDefinitions } = this.props
    const { selectedMapDefinition, isFogOfWar } = this.state

    return (
      <div className="NewGameMenu x5 relative">
        <div className="NewGameMenu-inner">
          <h1>New Game</h1>
          {!!userMapDefinitions.length && (
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
          <NewGameSelector 
            factions={selectedMapDefinition.factions} 
            updateFactions={this.updateSelectedMapDefinitionFactions}
            isFogOfWar={isFogOfWar}
            handleIsFogOfWarChange={isFogOfWar => this.setState({ isFogOfWar })}
            submit={this.handleNewGameSelectorSubmit}
            cancel={this.handleNewGameSelectorCancel}
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
