import version from './version.json'

function parseMajor(versionString) {
  return parseInt(versionString.split('.')[0])
}
function checkVersion() {
  const lastVersion = localStorage.getItem('wargame-version')

  if (lastVersion) {
    const lastVersionMajor = parseMajor(lastVersion)
    const versionMajor = parseMajor(version)

    // If the major has been bumped, we flush the state
    if (versionMajor > lastVersionMajor) {
      localStorage.removeItem('wargame-state')
    }
  }

  localStorage.setItem('wargame-version', version)
}

export default checkVersion
