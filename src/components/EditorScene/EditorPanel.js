import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import copy from 'clipboard-copy'

import gameConfiguration from '../../lib/gameConfiguration'
import createNewEditor from '../../lib/editor/createNewEditor'

import './EditorPanel.css'

const selectionColor = '#d4d4d4'
const exportToJsonLabel = 'Export to JSON'

class EditorPanel extends Component {

  constructor(props) {
    super(props)

    const { worldMap } = props

    this.state = {
      width: worldMap[0].length,
      height: worldMap.length,
      exportButtonLabel: exportToJsonLabel,
    }

    this.ref = React.createRef()
  }

  validateMap() {
    const { factions } = this.props

    const validations = []

    if (factions.length < 2) {
      validations.push('You need at least two factions to play')
    }

    for (let i = 0; i < factions.length; i++) {
      const faction = factions[i]

      const factionValidation = this.validateFaction(faction.id)

      if (factionValidation) validations.push(factionValidation)
    }

    return validations
  }

  validateFaction(factionId) {
    const { buildings, units } = this.props

    const hq = buildings.find(building => building.type === 'HEADQUARTERS' && building.factionId === factionId)

    if (!hq) {
      return `${gameConfiguration.factionsConfiguration[factionId].name} has no headquarters.`
    }

    const base = buildings.find(building =>
      building.factionId === factionId
      && (
        building.type === 'BASE'
        || building.type === 'AIRPORT'
        || building.type === 'PORT'
      )
    )

    if (!base && !units.some(unit => unit.factionId === factionId)) {
      return `${gameConfiguration.factionsConfiguration[factionId].name} has no units or ways to create some.`
    }
  }

  handleDimensionsSubmit = e => {
    e.preventDefault()

    const { width, height } = this.state
    const { worldMap, buildings, units, dispatch } = this.props

    const nextWorldMap = []

    for (let j = 0; j < height; j++) {
      const row = worldMap[j] || []
      const nextRow = []

      for (let i = 0; i < width; i++) {
        const tile = row[i] || 'PLAIN'

        nextRow.push(tile)
      }

      nextWorldMap.push(nextRow)
    }

    const nextBuildings = buildings.slice()

    for (let i = nextBuildings.length - 1; i >= 0; i--) {
      const { position } = nextBuildings[i]

      if (!(nextWorldMap[position.y] && nextWorldMap[position.y][position.x])) {
        nextBuildings.splice(i, 1)
      }
    }

    const nextUnits = units.slice()

    for (let i = nextUnits.length - 1; i >= 0; i--) {
      const { position } = nextUnits[i]

      if (!(nextWorldMap[position.y] && nextWorldMap[position.y][position.x])) {
        nextUnits.splice(i, 1)
      }
    }

    dispatch({
      type: 'SET_WORLD_MAP',
      payload: nextWorldMap,
    })

    dispatch({
      type: 'SET_BUILDINGS',
      payload: nextBuildings,
    })

    dispatch({
      type: 'SET_UNITS',
      payload: nextUnits,
    })

    dispatch({
      type: 'RESET_VIEW_BOX',
    })

    window.canvas.focus()
  }

  deselectTerrainType() {
    const { selectedTerrainType, dispatch } = this.props

    if (selectedTerrainType) {
      dispatch({
        type: 'DESELECT_TERRAIN_TYPE',
      })
    }
  }

  deselectBuildingType() {
    const { selectedBuildingType, dispatch } = this.props

    if (selectedBuildingType) {
      dispatch({
        type: 'DESELECT_BUILDING_TYPE',
      })
    }
  }

  deselectUnitType() {
    const { selectedUnitType, dispatch } = this.props

    if (selectedUnitType) {
      dispatch({
        type: 'DESELECT_UNIT_TYPE',
      })
    }
  }

  stopDeletingUnits() {
    const { booleans: { isDeletingUnits }, dispatch } = this.props

    if (isDeletingUnits) {
      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isDeletingUnits: false,
        },
      })
    }
  }

  stopFlippingUnits() {
    const { booleans: { isFlippingUnits }, dispatch } = this.props

    if (isFlippingUnits) {
      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isFlippingUnits: false,
        },
      })
    }
  }

  handleTerrainTypeSelection = terrainType => {
    const { selectedTerrainType, dispatch } = this.props

    this.deselectBuildingType()
    this.deselectUnitType()
    this.stopDeletingUnits()
    this.stopFlippingUnits()

    if (selectedTerrainType === terrainType) {
      dispatch({
        type: 'DESELECT_TERRAIN_TYPE',
      })
    }
    else {
      dispatch({
        type: 'SELECT_TERRAIN_TYPE',
        payload: terrainType,
      })
    }

    window.canvas.focus()
  }

  handleBuildingSelection = (factionId, buildingType) => {
    const { selectedBuildingType, selectedFactionId, dispatch } = this.props

    this.deselectTerrainType()
    this.deselectUnitType()
    this.stopDeletingUnits()
    this.stopFlippingUnits()

    dispatch({
      type: 'SELECT_FACTION_ID',
      payload: factionId,
    })

    if (selectedFactionId === factionId && selectedBuildingType === buildingType) {
      dispatch({
        type: 'DESELECT_BUILDING_TYPE',
      })
    }
    else {
      dispatch({
        type: 'SELECT_BUILDING_TYPE',
        payload: buildingType,
      })
    }

    window.canvas.focus()
  }

  handleUnitSelection = (factionId, unitType) => {
    const { selectedUnitType, selectedFactionId, dispatch } = this.props

    this.deselectTerrainType()
    this.deselectBuildingType()
    this.stopDeletingUnits()
    this.stopFlippingUnits()

    dispatch({
      type: 'SELECT_FACTION_ID',
      payload: factionId,
    })

    if (selectedFactionId === factionId && selectedUnitType === unitType) {
      dispatch({
        type: 'DESELECT_UNIT_TYPE',
      })
    }
    else {
      dispatch({
        type: 'SELECT_UNIT_TYPE',
        payload: unitType,
      })
    }

    window.canvas.focus()
  }

  handleDeleteUnitClick = () => {
    const { booleans, dispatch } = this.props

    this.deselectTerrainType()
    this.deselectBuildingType()
    this.deselectUnitType()
    this.stopFlippingUnits()

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isDeletingUnits: !booleans.isDeletingUnits,
      },
    })

    window.canvas.focus()
  }

  handleFlipUnitClick = () => {
    const { booleans, dispatch } = this.props

    this.deselectTerrainType()
    this.deselectBuildingType()
    this.deselectUnitType()
    this.stopDeletingUnits()

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isFlippingUnits: !booleans.isFlippingUnits,
      },
    })

    window.canvas.focus()
  }

  getMapDefinition() {
    const { worldMap, factions, buildings, units, mapDefinitionName, mapDefinitionDescription } = this.props

    return {
      worldMap,
      factions,
      buildings,
      units,
      name: mapDefinitionName,
      description: mapDefinitionDescription,
    }
  }

  handleSubmitClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'ADD_USER_MAP_DEFINITION',
      payload: this.getMapDefinition(),
    })
  }

  handleExportClick = () => {
    const mapDefinition = this.getMapDefinition()

    copy(JSON.stringify(mapDefinition, null, 2))

    this.setState({ exportButtonLabel: 'copied!' })

    setTimeout(() => this.setState({ exportButtonLabel: exportToJsonLabel }), 1000)
  }

  handleResetClick = () => {
    const confirmation = window.confirm('Are you sure you want to reset your work?')

    if (confirmation) {
      const { dispatch } = this.props

      createNewEditor()
      dispatch({ type: 'RESET_VIEW_BOX' })

      setTimeout(() => {
        const { worldMap } = this.props

        this.setState({
          width: worldMap[0].length,
          height: worldMap.length,
        })
      }, 0)
    }
  }

  handleQuitClick = () => {
    const { dispatch } = this.props

    dispatch(push('/'))
  }

  render() {
    const { mapDefinitionName, mapDefinitionDescription, factions, selectedTerrainType, selectedBuildingType, selectedUnitType, selectedFactionId, dispatch } = this.props
    const { width, height, exportButtonLabel } = this.state

    const validations = this.validateMap()

    return (
      <div className="EditorPanel" ref={this.ref} onMouseEnter={() => this.ref.current.focus()}>

        <section>
          <header>
            Dimensions
          </header>
          <form className="EditorPanel-dimensions x4" onSubmit={this.handleDimensionsSubmit}>
            <div>
              <div className="EditorPanel-dimensions-item">
                <span>
                  width:
                </span>
                <input type="number" min={1} max={100} value={width || ''} onChange={e => this.setState({ width: parseInt(e.target.value) })} />
              </div>
              <div className="EditorPanel-dimensions-item">
                <span>
                  height:
                </span>
                <input type="number" min={1} max={100} value={height || ''} onChange={e => this.setState({ height: parseInt(e.target.value) })} />
              </div>
            </div>
            <div className="x5 flex-grow">
              <button type="submit">Apply</button>
            </div>
          </form>
        </section>

        <section>
          <header>
            Terrain
          </header>
          <div className="EditorPanel-terrain x77">
            {Object.entries(gameConfiguration.terrainConfiguration).map(([type, configuration]) => {

              if (gameConfiguration.buildingTerrainTypes.includes(type)) return null

              return (
                <div
                  key={type}
                  className="EditorPanel-terrain-item no-select y8"
                  style={{
                    border: `1px solid ${selectedTerrainType === type ? selectionColor : 'white'}`,
                  }}
                  onClick={() => this.handleTerrainTypeSelection(type)}
                >
                  <div className="EditorPanel-terrain-item-tile" style={{ backgroundColor: configuration.color }} />
                  <div>
                    {configuration.name}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <header>
            Buildings
          </header>
          <div className="EditorPanel-buildings x77">
            {[[null, { color: '#c1c1c1' }], ...Object.entries(gameConfiguration.factionsConfiguration)].map(([factionId, factionConfiguration]) => (
              <div key={factionId} className="x77">
                {Object.entries(gameConfiguration.buildingsConfiguration).map(([buildingType, buildingConfiguration]) => {
                  if (!factionId && buildingType === 'HEADQUARTERS') return null

                  return (
                    <div
                      key={buildingType}
                      style={{
                        color: factionConfiguration.color,
                        border: `1px solid ${selectedFactionId === factionId && selectedBuildingType === buildingType ? selectionColor : 'white'}`,
                      }}
                      className="EditorPanel-buildings-item"
                      onClick={() => this.handleBuildingSelection(factionId, buildingType)}
                    >
                      {buildingConfiguration.name}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </section>

        <section>
          <header>
            Units
          </header>
          <div className="EditorPanel-units x77">
            {Object.entries(gameConfiguration.factionsConfiguration).map(([factionId, factionConfiguration]) => (
              <div key={factionId} className="x77">
                {Object.entries(gameConfiguration.unitsConfiguration).map(([unitType, unitConfiguration]) => {
                  if (!factionId && unitType === 'HEADQUARTERS') return null

                  return (
                    <div
                      key={unitType}
                      style={{
                        color: factionConfiguration.color,
                        border: `1px solid ${selectedFactionId === factionId && selectedUnitType === unitType ? selectionColor : 'white'}`,
                      }}
                      className="EditorPanel-units-item"
                      onClick={() => this.handleUnitSelection(factionId, unitType)}
                    >
                      {unitConfiguration.name}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div>
            <button type="button" onClick={this.handleDeleteUnitClick}>Delete units</button>
            <button type="button" onClick={this.handleFlipUnitClick}>Flip units</button>
          </div>
        </section>

        <section>
          <header>
            Factions
          </header>
          <div className="EditorPanel-factions">
            {factions.map(faction => (
              <div key={faction.id}>
                {gameConfiguration.factionsConfiguration[faction.id].name}: {this.validateFaction(faction.id) || 'playable'}
              </div>
            ))}
          </div>
        </section>

        <section>
          <header>
            Save and quit
          </header>
          <div className="EditorPanel-save">
            <div>
              <input
                type="text"
                value={mapDefinitionName}
                onChange={e => dispatch({ type: 'SET_MAP_DEFINITION_NAME', payload: e.target.value })}
                placeholder="name"
              />
            </div>
            <div>
              <textarea
                className="EditorPanel-save-textarea"
                value={mapDefinitionDescription}
                onChange={e => dispatch({ type: 'SET_MAP_DEFINITION_DESCRIPTION', payload: e.target.value })}
                placeholder="description"
              />
            </div>
            <div className="EditorPanel-save-validation">
              {validations.map(validation => (
                <div key={validation}>
                  {validation}
                </div>
              ))}
            </div>
            <div>
              <button type="button" disabled={!!validations.length} onClick={this.handleSubmitClick}>
                Save map
              </button>
            </div>
            <div>
              <button type="button" disabled={!!validations.length} onClick={this.handleExportClick}>
                {exportButtonLabel}
              </button>
            </div>
            <div>
              <button type="button" onClick={this.handleResetClick}>
               Reset all
              </button>
            </div>
            <div>
              <button type="button" onClick={this.handleQuitClick}>
                Go to main menu
              </button>
            </div>
          </div>
        </section>

      </div>
    )
  }
}

const mapStateToProps = s => ({
  booleans: s.booleans,
  buildings: s.buildings,
  factions: s.factions,
  mapDefinitionDescription: s.mapDefinitionDescription,
  mapDefinitionName: s.mapDefinitionName,
  selectedBuildingType: s.selectedBuildingType,
  selectedFactionId: s.selectedFactionId,
  selectedTerrainType: s.selectedTerrainType,
  selectedUnitType: s.selectedUnitType,
  units: s.units,
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(EditorPanel)
