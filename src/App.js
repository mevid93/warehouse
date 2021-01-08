
import React, { useEffect } from 'react'
import CategoryBar from './components/CategoryBar'
import ProductList from './components/ProductList'
import Pagination from './components/Pagination'
import listingService from './services/listingService'
import { useSelector, useDispatch } from 'react-redux'
import { productsChange } from './reducers/productsReducer'

// hard coded list of all possible product categories
const CATEGORIES = [
  {
    "id": 0,
    "name": "gloves"
  },
  {
    "id": 1,
    "name": "facemasks"
  },
  {
    "id": 2,
    "name": "beanies"
  }
]

const App = () => {

  // redux
  const category = useSelector(state => state.category)
  const dispatch = useDispatch()

  // when loaded for the first time
  useEffect(() => {
    listingService
      .getAll(category)
      .then(products => dispatch(productsChange(products)))
  }, [])

  // style
  const appStyle = {
    marginTop: "15px",
    marginBottom: "15px"
  }

  // render
  return (
    <div style={appStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <h1>Warehouse 1.0</h1>
        </div>
        <CategoryBar categories={CATEGORIES} />
        <ProductList />
        <Pagination />
      </div>
    </div>
  )
}

export default App