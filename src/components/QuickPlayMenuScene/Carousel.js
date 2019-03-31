/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import hotkeys from 'piano-keys'
import gameConfiguration from '../../lib/gameConfiguration'
import { samePosition } from '../../lib/common/utils'
import developmentMaps from '../../lib/mapDefinitions/development'
import standardMaps from '../../lib/mapDefinitions/standard'

import './Carousel.css'

const CarouselItem = React.memo(({ className, onClick, mapDefinition: { worldMap = [[]], buildings, name, description } = {} }) => (
  <div className={`CarouselItem ${className} y5 pointer`} onClick={onClick}>
    <div className="CarouselItem-tiles">
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
                className="CarouselItem-tile"
                style={{ backgroundColor: color }}
              />
            )
          })}
        </div>
      ))}
    </div>
    <div className="CarouselItem-info text-align-center">
      <h2>
        {name}
      </h2>
      <strong>
        {description}
      </strong>
    </div>
  </div>
))

class Carousel extends Component {

  state = {
    filter: 'standard',
    index: 0,
    animate: null,
    preAnimate: null,
  }

  componentDidMount() {
    this.unregisterFns = [
      hotkeys(document.documentElement, 'left', this.decrementIndex),
      hotkeys(document.documentElement, 'right', this.incrementIndex),
    ]
  }

  componentWillUnmount() {
    this.unregisterFns.forEach(fn => fn())
  }

  get array() {
    const { filter } = this.state
    const { userMapDefinitions } = this.props

    return {
      user: userMapDefinitions,
      standard: standardMaps,
      development: developmentMaps,
    }[filter]
  }

  incrementIndex = () => {
    const { array, state: { index } } = this

    this.setState({
      preAnimate: 'right',
    }, () => {
      setTimeout(() => {
        this.setState({
          animate: 'right',
        })
      }, 10)
    })

    setTimeout(() => {
      this.setState({
        animate: null,
        preAnimate: null,
        index: index - 1 < 0 ? array.length - 1 : index - 1,
      })
    }, 520)
  }

  decrementIndex = () => {
    const { array, state: { index } } = this

    this.setState({
      preAnimate: 'left',
    }, () => {
      setTimeout(() => {
        this.setState({
          animate: 'left',
        })
      }, 10)
    })

    setTimeout(() => {
      this.setState({
        animate: null,
        preAnimate: null,
        index: index + 1 >= array.length ? 0 : index + 1,
      })
    }, 520)
  }

  render() {
    const { array, props: { selectMapDefinition }, state: { index, preAnimate, animate, filter } } = this

    const l = array.length
    let indexMinusTwo = index < 2 ? l + index - 2 : index - 2
    const indexMinusOne = index < 1 ? l + index - 1 : index - 1
    const indexPlusOne = index + 1 >= l ? index - l + 1 : index + 1
    let indexPlusTwo = index + 2 >= l ? index - l + 2 : index + 2

    if (indexMinusTwo < 0) indexMinusTwo = 0
    if (indexPlusTwo >= l) indexPlusTwo = l - 1

    return (
      <div className="Carousel">
        <div className="x5 Carousel-filters">
          <div
            className={`Carousel-filter ${filter === 'user' ? 'Carousel-filter-active' : ''}`}
            onClick={() => this.setState({ filter: 'user' })}
          >
            User-created
          </div>
          <div
            className={`Carousel-filter ${filter === 'standard' ? 'Carousel-filter-active' : ''}`}
            onClick={() => this.setState({ filter: 'standard' })}
          >
            Standard
          </div>
          <div
            className={`Carousel-filter ${filter === 'development' ? 'Carousel-filter-active' : ''}`}
            onClick={() => this.setState({ filter: 'development' })}
          >
            Development
          </div>
        </div>
        <div className="x5">
          <i className="fas fa-chevron-left fa-5x Carousel-icon Carousel-icon-left" onClick={this.decrementIndex} />
          <CarouselItem
            mapDefinition={array[indexMinusTwo]}
            className={`CarouselItem-indexMinusTwo CarouselItem-indexMinusTwo-animate-${animate}`}
          />
          <CarouselItem
            mapDefinition={array[indexMinusOne]}
            className={`CarouselItem-indexMinusOne CarouselItem-indexMinusOne-animate-${animate}`}
          />
          <CarouselItem
            mapDefinition={array[index]}
            onClick={() => selectMapDefinition(array[index])}
            className={`CarouselItem-index CarouselItem-index-pre-animate-${preAnimate} CarouselItem-index-animate-${animate}`}
          />
          <CarouselItem
            mapDefinition={array[indexPlusOne]}
            className={`CarouselItem-indexPlusOne CarouselItem-indexPlusOne-animate-${animate}`}
          />
          <CarouselItem
            mapDefinition={array[indexPlusTwo]}
            className={`CarouselItem-indexPlusTwo CarouselItem-indexPlusTwo-animate-${animate}`}
          />
          <i className="fas fa-chevron-right fa-5x Carousel-icon Carousel-icon-right" onClick={this.incrementIndex} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  userMapDefinitions: s.userMapDefinitions,
})

export default connect(mapStateToProps)(Carousel)
