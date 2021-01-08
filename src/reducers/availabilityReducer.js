
// category reducer
const availabilityReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AVAILABILITIES':
      return action.availabilities
    default:
      return state
  }
}

// action reducer
export const availabilitiesChange = availabilities => {
  return {
    type: 'SET_AVAILABILITIES',
    availabilities,
  }
}

export default availabilityReducer