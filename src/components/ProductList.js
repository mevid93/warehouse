import { useSelector } from 'react-redux'

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
  const page = useSelector(state => state.page)

  // on each page, show 25 products
  const maxProductIndex = Math.min(page * 25, products.length - 1)
  const minProductIndex = Math.max(maxProductIndex - 25, 0)
  let productsToShow = []
  if (products.length > 0) {
    productsToShow = products.slice(minProductIndex, maxProductIndex)
  }

  // css for table
  const productListStyle = {
    "width": "80%",
    "border": "1px solid black"
  }

  // render
  return (
    <div>
      <h2>Product category: {category}</h2>
      <table style={productListStyle}>
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
      </table>
    </div>
  )
}

export default ProductList