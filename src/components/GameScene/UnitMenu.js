import React, { Component } from 'react'
import { connect } from 'react-redux'

import './UnitMenu.css'

import store from '../../state/store'
import { samePosition, findById } from '../../lib/common/utils'
import gameConfiguration from '../../lib/gameConfiguration'
import computeRangePositions from '../../lib/game/computeRangePositions'

class UnitMenu extends Component {

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

  closeMenu = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'SET_BOOLEAN',
      payload: {
        isUnitMenuOpened: false,
      },
    })

    window.canvas.focus()
  }

  deselect = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'DESELECT_UNIT_ID',
    })

    dispatch({
      type: 'DESELECT_POSITION',
    })
  }

  moveUnit = onCompletion => {
    const { dispatch, selectedUnitId, selectedPosition } = this.props

    dispatch({
      type: 'MOVE_UNIT',
      payload: {
        unitId: selectedUnitId,
        position: selectedPosition,
        onCompletion,
      },
    })
  }

  playUnit = () => {
    const { selectedUnitId, dispatch } = this.props

    dispatch({
      type: 'PLAY_UNIT',
      payload: {
        unitId: selectedUnitId,
      },
    })
  }

  capture = () => {
    const { buildings, selectedPosition, selectedUnitId, dispatch } = this.props

    dispatch({
      type: 'CAPTURE',
      payload: {
        unitId: selectedUnitId,
        buildingId: buildings.find(building => samePosition(building.position, selectedPosition)).id,
      },
    })
  }

  mergeUnits = mergedUnit => {
    const { selectedUnitId, dispatch } = this.props

    dispatch({
      type: 'MERGE_UNITS',
      payload: {
        unitId: selectedUnitId,
        mergedUnitId: mergedUnit.id,
      },
    })
  }

  handleFireClick = () => {
    const { dispatch } = this.props

    this.moveUnit(() => {
      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isFireSelection: true,
        },
      })

      dispatch({
        type: 'DESELECT_POSITION',
      })
    })

    this.closeMenu()
  }

  handleCaptureClick = () => {
    const { units, selectedPosition, selectedUnitId } = this.props

    const unit = findById(units, selectedUnitId)

    this.closeMenu()

    if (!samePosition(unit.position, selectedPosition)) {
      this.moveUnit(() => {
        this.capture()
        this.playUnit()
        this.deselect()
      })
    }
    else {
      this.capture()
      this.playUnit()
      this.deselect()
    }
  }

  handleMoveClick = () => {
    this.closeMenu()
    this.moveUnit(() => {
      this.playUnit()
      this.deselect()
    })
  }

  handleDoNothingClick = () => {
    this.closeMenu()
    this.playUnit()
    this.deselect()
  }

  handleMergeClick = mergedUnit => {
    this.closeMenu()
    this.moveUnit(() => {
      this.mergeUnits(mergedUnit)
      this.deselect()
    })
  }

  handleCancelClick = () => {
    this.closeMenu()
    this.deselect()
  }

  render() {
    if (!window.canvas) return null

    const { booleans, buildings, units, selectedPosition, selectedUnitId } = this.props

    if (!booleans.isUnitMenuOpened || !selectedUnitId || !selectedPosition) return null

    const selectedUnit = findById(units, selectedUnitId)
    const unitOnSelectedPosition = units.find(u => samePosition(u.position, selectedPosition))
    const rangePositions = computeRangePositions(store, selectedUnit, selectedPosition) // range positions at selected position
    const selectedUnitOnSelectedPosition = samePosition(selectedPosition, selectedUnit.position)

    const { top, left } = this.menuPosition
    const { topDiff, leftDiff } = this.state

    return (
      <div
        ref={this.handleRef}
        className="UnitMenu absolute no-select pointer"
        style={{
          top: top - topDiff,
          left: left - leftDiff,
        }}
      >
        {units.some(unit => // If there is a unit
          unit.team !== selectedUnit.team // From opposite team
          && rangePositions.some(position => samePosition(position, unit.position)) // In range
          && gameConfiguration.unitsConfiguration[selectedUnit.type].damages[unit.type] // Able to take damages from selectedUnit
        ) && (
          <div className="UnitMenu-item" onClick={this.handleFireClick}>
            Fire
          </div>
        )}
        {buildings.some(building => // If there is a building
          building.team !== selectedUnit.team // From opposite or no team
          && samePosition(selectedPosition, building.position) // at selected position
          && gameConfiguration.infanteryUnitTypes.includes(selectedUnit.type) // and the selected unit can capture it
        ) && (
          <div className="UnitMenu-item" onClick={this.handleCaptureClick}>
            Capture
          </div>
        )}
        {(!selectedUnitOnSelectedPosition
          && !unitOnSelectedPosition
        ) && (
          <div className="UnitMenu-item" onClick={this.handleMoveClick}>
            Move
          </div>
        )}
        {selectedUnitOnSelectedPosition && (
          <div className="UnitMenu-item" onClick={this.handleDoNothingClick}>
            Do nothing
          </div>
        )}
        {(unitOnSelectedPosition
          && unitOnSelectedPosition.id !== selectedUnit.id
          && unitOnSelectedPosition.type === selectedUnit.type
          && selectedUnit.life < gameConfiguration.maxUnitLife
          && unitOnSelectedPosition.life < gameConfiguration.maxUnitLife
        ) && (
          <div className="UnitMenu-item" onClick={() => this.handleMergeClick(unitOnSelectedPosition)}>
            Merge
          </div>
        )}
        <div className="UnitMenu-item" onClick={this.handleCancelClick}>
          Cancel
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  booleans: s.booleans,
  buildings: s.buildings,
  selectedPosition: s.selectedPosition,
  selectedUnitId: s.selectedUnitId,
  units: s.units,
  viewBox: s.viewBox,
})

export default connect(mapStateToProps)(UnitMenu)
