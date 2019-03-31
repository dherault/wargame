/* eslint-disable import/prefer-default-export */
/*
  Helpers make domain logic DRY
*/

export function getRemainingTeams(buildings, units) {
  const remainingHqTeams = new Set()
  const remainingUnitsTeams = new Set()

  buildings.forEach(building => {
    if (building.type === 'HEADQUARTERS') {
      remainingHqTeams.add(building.team)
    }
  })

  units.forEach(unit => {
    remainingUnitsTeams.add(unit.team)
  })

  return [...remainingHqTeams].filter(team => remainingUnitsTeams.has(team))
}

