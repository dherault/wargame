import React, { Component } from 'react'
import { connect } from 'react-redux'
import gameConfiguration from '../lib/gameConfiguration'

import './EditorPanel.css'

class EditorPanel extends Component {

  constructor(props) {
    super(props)

    const { worldMap } = this.props

    this.state = {
      width: worldMap[0].length,
      height: worldMap.length,
    }
  }

  handleDimensionsSubmit = e => {
    e.preventDefault()

    const { width, height } = this.state
    const { worldMap, dispatch } = this.props

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

    dispatch({
      type: 'SET_WORLD_MAP',
      payload: nextWorldMap,
    })

    dispatch({
      type: 'RESET_VIEW_BOX',
    })
  }

  handleTerrainSelection = terrain => {
    const { selectedTerrainType, dispatch } = this.props

    if (selectedTerrainType === terrain) {
      dispatch({
        type: 'DESELECT_TERRAIN',
      })
    }
    else {
      dispatch({
        type: 'SELECT_TERRAIN',
        payload: terrain,
      })
    }
  }

  render() {
    const { selectedTerrainType } = this.props
    const { width, height } = this.state

    return (
      <div className="EditorPanel">
        
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

              if (gameConfiguration.buildingTerrains.includes(type)) return null
              
              return (
                <div 
                  key={type} 
                  className="EditorPanel-terrain-item no-select y8"
                  style={{ 
                    border: `1px solid ${selectedTerrainType === type ? '#d4d4d4' : 'white'}`, 
                  }}
                  onClick={() => this.handleTerrainSelection(type)}
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
            Factions
          </header>
        </section>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  factions: s.factions,
  selectedTerrainType: s.selectedTerrainType,
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(EditorPanel)
