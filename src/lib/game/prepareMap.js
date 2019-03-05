import { createId, cloneArrayOfObjects } from '../common/utils'

function prepareMap({ worldMap, factions, buildings, units }) {
  const nextFactions = cloneArrayOfObjects(factions)
  const nextBuidlings = cloneArrayOfObjects(buildings)
  const nextUnits = cloneArrayOfObjects(units)

  nextFactions.forEach((faction, i) => {
    if (typeof faction.alive !== 'boolean') faction.alive = true
    if (!faction.type) faction.type = faction.id === 'BLUE' ? 'HUMAN' : 'COMPUTER'
    if (!faction.team) faction.team = i + 1
  })

  nextBuidlings.forEach(building => {
    if (!building.id) building.id = createId()
    if (typeof building.capture !== 'number') building.capture = 100
    if (typeof building.team !== 'number') {
      const faction = factions.find(faction => faction.id === building.factionId)

      building.team = faction ? faction.team : 0
    }
  })

  nextUnits.forEach(unit => {
    if (!unit.id) unit.id = createId()
    if (typeof unit.life !== 'number') unit.life = 100
    if (typeof unit.played !== 'boolean') unit.played = false
    if (typeof unit.team !== 'number') {
      const faction = factions.find(faction => faction.id === unit.factionId)

      unit.team = faction ? faction.team : 0
    }
  })

  return {
    worldMap,
    factions,
    buildings: nextBuidlings,
    units: nextUnits,
  }
}

export default prepareMap
