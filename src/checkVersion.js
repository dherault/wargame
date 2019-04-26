import versionJson from './version.json'

function parseMajor(versionString) {
  return parseInt(versionString.split('.')[0])
}

function checkVersion() {
  const lastVersion = localStorage.getItem('basicwars-version')

  if (lastVersion) {
    const lastVersionMajor = parseMajor(lastVersion)
    const versionMajor = parseMajor(versionJson.version)

    // If the major has been bumped, we flush the state
    if (versionMajor > lastVersionMajor) {
      localStorage.removeItem('basicwars-state')
    }
  }

  localStorage.setItem('basicwars-version', versionJson.version)
}

export default checkVersion
