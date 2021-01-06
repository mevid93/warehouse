import axios from 'axios'
const baseUrl = '/v2/products'

// get all products from a given category
const getAll = (category) => {
  return axios.get(`${baseUrl}/${category}`).then(response => response.data)
}

export default { getAll }