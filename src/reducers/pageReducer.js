// page 
const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return action.page
    case 'PREVIOUS':
      return state - 1
    case 'NEXT':
      return state + 1
    default:
      return state
  }
}

// action reducer to set page
export const pageChange = page => {
  return {
    type: 'SET_PAGE',
    page,
  }
}

// action reducer to go the previous page
export const pagePrevious = page => {
  return {
    type : "PREVIOUS"
  }
}

// action reducer to go to next page
export const pageNext = () => {
  return {
    type: 'NEXT'
  }
}

export default pageReducer