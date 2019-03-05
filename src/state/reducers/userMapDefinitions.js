function userMapDefinitions(state = [], action) {

  switch (action.type) {
    case 'ADD_USER_MAP_DEFINITION': 
      return [...state, action.payload]

    default: 
      return state
  }
}

export default userMapDefinitions
