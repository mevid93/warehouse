import axios from 'axios'
const baseUrl = '/v2/products'

// get all products from a given category
const getAll = (category) => {
  return axios
    .get(`${baseUrl}/${category}`)
    .then(response => {
      const products = response.data
      // set information that availability is still loading
      products.forEach(p => {
        p.availability = "Loading..."
      });
      return products
    })
    .catch()
}

const service = { getAll }
export default service