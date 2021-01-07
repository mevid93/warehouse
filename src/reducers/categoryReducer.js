
// category reducer
const categoryReducer = (state = 'gloves', action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return action.category
    default:
      return state
  }
}

// action reducer
export const categoryChange = category => {
  return {
    type: 'SET_CATEGORY',
    category,
  }
}

export default categoryReducer