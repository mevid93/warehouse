
import React, { useEffect } from 'react'
import CategoryBar from './components/CategoryBar'
import ProductList from './components/ProductList'
import Pagination from './components/Pagination'
import productService from './services/productService'
import availabilityService from './services/availabilityService'
import { useSelector, useDispatch } from 'react-redux'
import { productsChange } from './reducers/productsReducer'
import { availabilitiesChange } from './reducers/availabilityReducer'


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
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  // when loaded for the first time
  useEffect(() => {
    productService
      .getAll(category)
      .then(products => dispatch(productsChange(products)))
      .then()
      .catch(() => console.log("Error: Could not load products!"))
  }, [])

  // when products change --> get availability information
  useEffect(() => {
    if (products === undefined || products.length <= 0) { return }

    let ignore = false

    // extract distinct manufacturer info from products
    const manufacturers = products.map(p => p.manufacturer)
      .filter((value, index, self) => self.indexOf(value) === index)

    // get availability information for each manufacturer
    // and then update the availability redux state
    Promise.all(manufacturers.map(m => {
      const avails = availabilityService
        .getAll(m)
        .then(data => data)
        .catch(() => console.log("Error: could not load availability information!"))
      return avails
    })).then(availabilities => {
      if (!ignore) dispatch(availabilitiesChange(availabilities))
    }).catch(() => console.log("Error: could not update availability information!"))

    return () => { ignore = true; }
  }, [products])

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