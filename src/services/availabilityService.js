import axios from 'axios'
const baseUrl = '/v2/availability/'

const getAll = (manufacturer) => {
  return axios.get(`${baseUrl}/${manufacturer}`).then(response => response.data)
}

export default { getAll }