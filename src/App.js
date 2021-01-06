
import React, { useState, useEffect } from 'react'
import Button from './components/Button'
import productService from './services/productService'

const App = () => {
  const [category, setCategory] = useState("gloves")

  useEffect(() => {
    productService
      .getAll(category)
      .then(data => {
        console.log(data)
      })
  }, [])

  return (
    <div>
      <h1>Warehouse</h1>
      <Button text={"gloves"} handler={() => setCategory("gloves")} />
      <Button text={"facemasks"} handler={() => setCategory("facemasks")} />
      <Button text={"beanies"} handler={() => setCategory("beanies")} />
    </div>
  )
}

export default App