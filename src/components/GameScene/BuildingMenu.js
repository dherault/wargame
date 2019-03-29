import React, { Component } from 'react'
import { connect } from 'react-redux'

import './BuildingMenu.css'

import { samePosition } from '../../lib/common/utils'
import gameConfiguration from '../../lib/gameConfiguration'

class BuildingMenu extends Component {

  state = {
    topDiff: 0,
    leftDiff: 0,
  }

  get menuPosition() {
    const { selectedPosition, viewBox } = this.props
    const tileSize = window.canvas.width / viewBox.width // pixel per tile

    return {
      left: (selectedPosition.x - viewBox.x + 1) * tileSize + viewBox.offsetX,
      top: (selectedPosition.y - viewBox.y) * tileSize + viewBox.offsetY,
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedPosition } = this.props

    if (!selectedPosition) return
    if (prevProps.selectedPosition && samePosition(prevProps.selectedPosition, selectedPosition)) return

    this.setDiffs()
  }

  setDiffs = () => {
    if (!(this.width && this.height)) return

    const { viewBox } = this.props
    const { innerWidth, innerHeight } = window
    const position = this.menuPosition
    const tileSize = window.canvas.width / viewBox.width // pixel per tile

    this.setState({
      leftDiff: position.left + this.width > innerWidth ? this.width + tileSize : 0,
      topDiff: position.top + this.height > innerHeight ? this.height - tileSize : 0,
    })
  }

  handleRef = element => {
    if (!element) return
    // setTimeout so the component can adjust its size
    setTimeout(() => {
      const { clientWidth, clientHeight } = element

      this.width = clientWidth
      this.height = clientHeight

      this.setDiffs()
    }, 0)
  }

  handleCreateUnitClick = type => {
    const { currentFaction, selectedPosition, dispatch } = this.props

    dispatch({
      type: 'CREATE_UNIT',
      payload: {
        type,
        position: selectedPosition,
        factionId: currentFaction.id,
        team: currentFaction.team,
      },
    })

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isBuildingMenuOpened: false,
      },
    })

    dispatch({
      type: 'DESELECT_POSITION',
    })

    window.canvas.focus()
  }

  render() {
    if (!window.canvas) return null

    const { buildings, selectedPosition, booleans } = this.props

    if (!booleans.isBuildingMenuOpened || !selectedPosition) return null

    const building = buildings.find(building => samePosition(building.position, selectedPosition))

    const movementTypes = gameConfiguration.buildingsConfiguration[building.type].creatableUnitMovementTypes

    if (!movementTypes) return null

    const availableUnits = Object.entries(gameConfiguration.unitsConfiguration)
      .filter(entry => movementTypes.includes(entry[1].movementType))
      .map(([type, unitConfiguration]) => ({
        type,
        cost: unitConfiguration.cost,
        name: unitConfiguration.name,
      }))

    const { top, left } = this.menuPosition
    const { topDiff, leftDiff } = this.state

    return (
      <table
        ref={this.handleRef}
        style={{
          top: top - topDiff,
          left: left - leftDiff,
        }}
        className="BuildingMenu absolute no-select pointer"
      >
        <tbody>
          {availableUnits.map(data => (
            <tr
              key={data.type}
              className="BuildingMenu-item"
              onClick={() => this.handleCreateUnitClick(data.type)}
            >
              <td>
                {data.name}
              </td>
              <td className="text-align-right">
                {data.cost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = s => ({
  booleans: s.booleans,
  buildings: s.buildings,
  currentFaction: s.currentFaction,
  selectedPosition: s.selectedPosition,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(BuildingMenu)
