import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

// component representing single product element in a list
const Product = (props) => {

  // style for product
  const productStyle = {
    "border": "1px solid black"
  }

  // render
  return (
    <tr>
      <td style={productStyle}>{props.name}</td>
      <td style={productStyle}>{props.manufacturer}</td>
      <td style={productStyle}>{props.color.toString()}</td>
      <td style={productStyle}>{props.price}</td>
      <td style={productStyle}>{props.availability}</td>
    </tr>
  )
}


// listing component where all the product of current
// category are listed
const ProductList = () => {

  // redux store
  const category = useSelector(state => state.category)
  const products = useSelector(state => state.products)
  const availabilities = useSelector(state => state.availabilities)
  const page = useSelector(state => state.page)

  // on each page, show 25 products
  const maxProductIndex = Math.min(page * 25, products.length - 1)
  const minProductIndex = Math.max(maxProductIndex - 25, 0)
  let productsToShow = []
  if (products.length > 0) {
    productsToShow = products.slice(minProductIndex, maxProductIndex)
  }

  // for each product to show --> determine their availability information
  productsToShow.forEach(p => {
    let updated = false
    if (availabilities !== undefined && availabilities.length > 0) {
      for (let a of availabilities) {
        if (a !== undefined && a.response !== undefined) {
          for (let o of a.response) {
            if (o !== undefined && o.id !== undefined && o.id.toUpperCase() === p.id.toUpperCase()) {
              const start = o.DATAPAYLOAD.indexOf("<INSTOCKVALUE>")
              const end = o.DATAPAYLOAD.indexOf("</INSTOCKVALUE>")
              p.availability = o.DATAPAYLOAD.substring(start + 14, end)
              updated = true
              break
            }
          }
          if (updated) break
        }
      }
      if (updated === false) p.availability = "???"
    }
  })

  // show current page info
  const currentPageInfo = `(${page}/${Math.ceil(products.length / 25)})`

  // render
  return (
    <div>
      <h2>Product category: {category} {currentPageInfo}</h2>
      <Table striped="true" bordered="true" hover="true" variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Colors</th>
            <th>Price</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {productsToShow.map(p => <Product key={p.id}
            name={p.name}
            manufacturer={p.manufacturer}
            color={p.color}
            price={p.price}
            availability={p.availability}
          />)}
        </tbody>
      </Table>
    </div>
  )
}

export default ProductList