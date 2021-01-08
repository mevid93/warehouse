
// products reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.products
    default:
      return state
  }
}

// action reducer
export const productsChange = products => {
  return {
    type: 'SET_PRODUCTS',
    products,
  }
}

export default productsReducer