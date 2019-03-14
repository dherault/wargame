function mapDefinitionName(state = '', action) {
  if (action.type === 'SET_MAP_DEFINITION_NAME') {
    return action.payload
  }

  return state
}

export default mapDefinitionName
