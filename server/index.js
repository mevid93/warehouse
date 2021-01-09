const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()

// apply middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// server uses cache that is valid for 5 minutes
// after that, the cache will be updated when a succesfull
// request is made. if the request is not succesfull, we use
// the old data from cache, but do not reset the timer.
// this makes sure that data is available, and the next request
// will once again try to update the cache data

// cache product information
let PRODUCTS = []

// cache manufacturer information
let MANUFACTURERS = []

// function for checking if timestamp is old
const timestampIsValid = (timestamp) => {
  if ((Date.now() / 1000 - timestamp) > 5 * 60) {
    return false
  }
  return true
}

// proxy request the old api information
app.get('/api/products/:category', (req, res) => {
  const category = req.params.category
  if (category === null || category === undefined) {
    return res.status(400).json({ error: "category missing" })
  }
  // check if product already cached and timer not exceeded
  const obj = PRODUCTS.find(o => o.category === category)
  if (obj !== null && obj !== undefined && timestampIsValid(obj.timestamp)) {
    return res.json(obj.products)
  }
  // retrieve data from old api
  axios
    .get(`https://bad-api-assignment.reaktor.com/v2/products/${category}`)
    .then(response => {
      const products = response.data
      // set information that availability is still loading
      products.forEach(p => { p.availability = "Loading..." })
      // update cache before returning
      PRODUCTS = PRODUCTS.filter(o => o.category !== category)
      PRODUCTS.push({
        category,
        products,
        timestamp: Date.now() / 1000
      })
      res.json(products)
    })
    .catch(() => res.status(404).json({ error: "could not find data for category " }))
})

// proxy request the old api infomration
app.get('/api/availability/:manufacturer', (req, res) => {
  const manufacturer = req.params.manufacturer
  if (manufacturer === null || manufacturer === undefined) {
    return res.status(400).json({ error: "manufacturer missing" })
  }
  // check if manufacturer availabilities already cached and timer not exceeded
  const obj = MANUFACTURERS.find(o => o.manufacturer === manufacturer)
  if (obj !== null && obj !== undefined && timestampIsValid(obj.timestamp)) {
    return res.json(obj.availabilities)
  }
  // retrieve data from old api
  axios
    .get(`https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`)
    .then(response => {
      const availabilities = response.data
      // update cache before returning -- only if the request returned data
      const oldData = MANUFACTURERS.find(o => o.manufacturer === manufacturer)
      MANUFACTURERS = MANUFACTURERS.filter(o => o.manufacturer !== manufacturer)
      if (availabilities !== null && availabilities !== undefined && availabilities.response !== "[]") {
        MANUFACTURERS.push({
          manufacturer,
          availabilities,
          timestamp: Date.now() / 1000
        })
      }else if (oldData !== null && oldData !== undefined) {
        MANUFACTURERS.push(oldData)
      }
      res.json(availabilities)
    })
    .catch(() => res.status(404).json({ error: "could not find data for manufacturer" }))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})