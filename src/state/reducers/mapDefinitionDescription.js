function mapDefinitionDescription(state = '', action) {
  if (action.type === 'SET_MAP_DEFINITION_DESCRIPTION') {
    return action.payload
  }

  return state
}

export default mapDefinitionDescription
