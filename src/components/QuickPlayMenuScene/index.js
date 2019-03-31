import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import prepareMap from '../../lib/game/prepareMap'
import createNewGame from '../../lib/game/createNewGame'
import createNewEditor from '../../lib/editor/createNewEditor'

import './index.css'

import Carousel from './Carousel'
import NewGameSelector from './NewGameSelector'

class QuickPlayMenuScene extends Component {

  state = {
    selectedMapDefinition: null,
    isFogOfWar: false,
  }

  handleReturnClick = () => {
    const { dispatch } = this.props

    dispatch(push('/'))
  }

  updateSelectedMapDefinitionFactions = factions => {
    const { selectedMapDefinition } = this.state

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

  render() {
    const { selectedMapDefinition, isFogOfWar } = this.state

    return (
      <div className="QuickPlayMenuScene relative">
        <div className="QuickPlayMenuScene-return" onClick={this.handleReturnClick}>
          Return
        </div>
        <h1 className="text-align-center gold">Quick Play</h1>
        <Carousel selectMapDefinition={mapDefinition => this.setState({ selectedMapDefinition: mapDefinition })} />
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

export default connect()(QuickPlayMenuScene)
