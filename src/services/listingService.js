import productService from './productService'
import availabilityService from './availabilityService'

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

      products.forEach(element => {
        element.availability = "Loading..."
      });

      // extract distinct manufacturer info from products
      const manufacturers = products.map(p => p.manufacturer)
        .filter((value, index, self) => self.indexOf(value) === index)

      // for each manufacturer --> find the product availability information
      const availabilities = manufacturers.map(m => {
        const avails = availabilityService
          .getAll(m)
          .then(data => {
            console.log(data)
            return data
          })
          .catch(error => {
            console.log(error)
            return []
          })
        return avails
      })

      

      // combiner the product information and availability information

      return products
    })
    .catch(error => {
      // something went wrong --> notify the user
      console.log(error)
    })
}

const service = { getAll }
export default service