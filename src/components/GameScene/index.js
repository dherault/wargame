import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import hotkeys from 'piano-keys'
import registerCanvas from '../../lib/game/registerCanvas'

import './index.css'

import AiComputationModal from './AiComputationModal'
import BuildingMenu from './BuildingMenu'
import DevPanel from './DevPanel'
import FireInfo from './FireInfo'
import GameOverModal from './GameOverModal'
import InGameMenuModal from './InGameMenuModal'
import NewTurnModal from './NewTurnModal'
import TileInfo from '../shared/TileInfo'
import TurnInfo from './TurnInfo'
import UnitMenu from './UnitMenu'

class GameScene extends Component {

  state = {
    inGameMenuOpened: false,
  }

  componentDidMount() {
    console.log('Mounting GameScene', window.innerWidth, window.innerHeight)
    const { worldMap, dispatch } = this.props

    if (!worldMap) return dispatch(push('/'))

    const canvas = document.getElementById('canvas-game')

    /* Resize canvas */

    this.resizeCanvasListener = () => this.resizeCanvas(canvas)

    window.addEventListener('resize', this.resizeCanvasListener)

    this.resizeCanvas(canvas)

    /* Register canvas and draw */

    const unregisterCanvas = registerCanvas(canvas)

    /* Reset view box and resume game */

    dispatch({ type: 'RESET_VIEW_BOX' })
    dispatch({ type: 'RESUME_GAME' })

    /* Register shortcuts */

    const unregisterCtrlQ = hotkeys(document.documentElement, 'ctrl+q', e => {
      e.preventDefault()

      const { booleans: { isDevPanelOpened }, dispatch } = this.props

      dispatch({
        type: 'SET_BOOLEAN',
        payload: {
          isDevPanelOpened: !isDevPanelOpened,
        },
      })
    })

    const unregisterEscape = hotkeys(document.documentElement, 'escape', () => {
      this.setState(state => ({ inGameMenuOpened: !state.inGameMenuOpened }))
    })

    /* create unregister functions */

    this.removeListenersFunctions = [
      () => window.removeEventListener('resize', this.resizeCanvasListener),
      unregisterCanvas,
      unregisterCtrlQ,
      unregisterEscape,
    ]
  }

  componentWillUnmount() {
    (this.removeListenersFunctions || []).forEach(fn => fn())
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  handleCloseInGameMenu = () => {
    this.setState({ inGameMenuOpened: false })

    window.canvas.focus()
  }

  render() {
    const { currentFaction, gameOver, booleans: { isDevPanelOpened, isNewTurnAnimation, isAiComputing } } = this.props
    const { inGameMenuOpened } = this.state

    // tabIndex 0: https://stackoverflow.com/a/12887221/4847258
    return (
      <div className="GameScene relative">
        <canvas
          id="canvas-game"
          className="GameScene-canvas no-select"
          tabIndex={0}
        />
        <button
          type="button"
          className="GameScene-menu-button"
          onClick={() => this.setState(state => ({ inGameMenuOpened: !state.inGameMenuOpened }))}
        >
          Menu
        </button>
        <BuildingMenu />
        <FireInfo />
        <TileInfo />
        <TurnInfo />
        <UnitMenu />
        {isDevPanelOpened && <DevPanel />}
        {isNewTurnAnimation && <NewTurnModal />}
        {gameOver && <GameOverModal />}
        {!isNewTurnAnimation && isAiComputing && currentFaction.type === 'COMPUTER' && <AiComputationModal />}
        {inGameMenuOpened && <InGameMenuModal resume={this.handleCloseInGameMenu} />}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  currentFaction: s.currentFaction,
  gameOver: s.gameOver,
  booleans: s.booleans,
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(GameScene)
