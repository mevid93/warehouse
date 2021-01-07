import { useSelector } from 'react-redux'

// single product element in a list
const Product = (props) => {

  // render
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.manufacturer}</td>
      <td>{props.color.toString()}</td>
      <td>{props.price}</td>
      <td>{props.availability}</td>
    </tr>
  )
}


// listing component where all the product of current
// category are listed
const ProductList = () => {

  // redux store
  const category = useSelector(state => state.category)
  const products = useSelector(state => state.products)

  // on each page, show 25 products
  const productsToShow = products.slice(0, 25)

  // css for table
  const productListStyle = {
    "width": "80%"
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
            availability={"TODO!"}
          />)}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList