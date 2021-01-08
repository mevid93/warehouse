
import React, { useEffect } from 'react'
import Notification from './components/Notification'
import CategoryBar from './components/CategoryBar'
import ProductList from './components/ProductList'
import Pagination from './components/Pagination'
import productService from './services/productService'
import availabilityService from './services/availabilityService'
import { useSelector, useDispatch } from 'react-redux'
import { productsChange } from './reducers/productsReducer'
import { availabilitiesChange } from './reducers/availabilityReducer'
import { notificationChange } from './reducers/notificationReducer'


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
  const availabilities = useSelector(state => state.availabilities)
  const dispatch = useDispatch()

  // when loaded for the first time
  useEffect(() => {
    productService
      .getAll(category)
      .then(products => dispatch(productsChange(products)))
      .catch()
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
        .catch(() => [])
      return avails
    })).then(avails => {
      if (!ignore) {
        let newAvails = new Array(manufacturers.length)
        let i = 0
        avails.forEach(a => {
          if (availabilities !== null && availabilities !== undefined && availabilities.length === manufacturers.length){
            newAvails[i] = availabilities[i]
          }
          if (a.response !== undefined && a.response === "[]"){
            dispatch(notificationChange("Could not retieve all latest availability information!"))
            setTimeout(() => {dispatch(notificationChange(null))}, 5000)
          }else{
            newAvails[i] = a
          }
          i = i + 1
        })
        dispatch(availabilitiesChange(newAvails))
      }
    }).catch()

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
        <Notification error="true" />
        <CategoryBar categories={CATEGORIES} />
        <ProductList />
        <Pagination />
      </div>
    </div>
  )
}

export default App