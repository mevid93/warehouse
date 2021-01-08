import axios from 'axios'
const baseUrl = '/v2/availability'

// get product availability information from given manufacturer
const getAll = (manufacturer) => {
  return axios
    .get(`${baseUrl}/${manufacturer}`)
    .then(response => response.data)
    .catch()
}

const service = { getAll }
export default service