import productService from './productService'

// this service will combine the results from the two legacy APIs
// in order to provide the required functionality for the new application
// The APIs are running at https://bad-api-assignment.reaktor.com/.
// GET /v2/products/:category – Return a listing of products in a given category.
// GET /v2/availability/:manufacturer – Return a list of availability info.

// get all the products from a given category and their availability information
const getAll = (category) => {
  return productService
    .getAll(category)
    .then(products => {
      return products
    })
    .catch(error => {
      // something went wrong --> notify the user

    })
}

const service = { getAll }
export default service