import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import maps from '../../lib/maps/development'
import prepareMap from '../../lib/game/prepareMap'
import createNewGame from '../../lib/game/createNewGame'
import createNewEditor from '../../lib/editor/createNewEditor'
import gameConfiguration from '../../lib/gameConfiguration'
import { samePosition } from '../../lib/common/utils'

import './QuickPlayMenu.css'

import NewGameSelector from './NewGameSelector'

class QuickPlayMenu extends Component {

  state = {
    selectedMapDefinition: null,
    isFogOfWar: false,
  }

  handleReturnClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'SELECT_MENU',
      payload: null,
    })
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
    const { dispatch } = this.props
    const { selectedMapDefinition, isFogOfWar } = this.state

    createNewGame(prepareMap(selectedMapDefinition), isFogOfWar)

    dispatch(push('/game'))
  }

  handleNewGameSelectorEdit = () => {
    const { dispatch } = this.props
    const { selectedMapDefinition } = this.state

    createNewEditor(selectedMapDefinition)

    dispatch(push('/editor'))
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
        className="QuickPlayMenu-item x5b"
      >
        <div>
          <strong>{mapDefinition.name}</strong>
          <div>{mapDefinition.description}</div>
        </div>
        <div>{this.renderWorldMapMiniature(mapDefinition)}</div>
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
                  className="QuickPlayMenu-tile"
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
      <div className="QuickPlayMenu relative">
        <div className="QuickPlayMenu-return" onClick={this.handleReturnClick}>
          Return
        </div>
        <h1>Quick Play</h1>
        {!!userMapDefinitions.length && (
          <div>
            <h2>User created maps</h2>
            <div>
              {userMapDefinitions.map((mapDefinition, i) => this.renderMap(mapDefinition, i))}
            </div>
          </div>
        )}
        <div>
          <h2>Development Maps</h2>
          <div>
            {maps.map((mapDefinition, i) => this.renderMap(mapDefinition, i))}
          </div>
        </div>
        {selectedMapDefinition && (
          <NewGameSelector 
            name={selectedMapDefinition.name}
            factions={selectedMapDefinition.factions} 
            updateFactions={this.updateSelectedMapDefinitionFactions}
            isFogOfWar={isFogOfWar}
            handleIsFogOfWarChange={isFogOfWar => this.setState({ isFogOfWar })}
            submit={this.handleNewGameSelectorSubmit}
            edit={this.handleNewGameSelectorEdit}
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

export default connect(mapStateToProps)(QuickPlayMenu)
