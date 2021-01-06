
import React, { useState, useEffect } from 'react'
import CategoryBar from './components/CategoryBar'
import ProductList from './components/ProductList'
import productService from './services/productService'

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

  // state information
  const [category, setCategory] = useState(CATEGORIES[0].name)

  // when loaded for the first time
  useEffect(() => {
    productService
      .getAll(category)
      .then(data => {
        console.log(data)
      })
  }, [])

  // render
  return (
    <div>
      <h1>Warehouse</h1>
      <CategoryBar categories={CATEGORIES} setCategory={setCategory} />
      <ProductList category={category} />
    </div>
  )
}

export default App