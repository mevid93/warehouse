
const ProductList = ({ category, productData }) => {

  return (
    <div>
      <h2>Product category: {category}</h2>
      <table>
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProductList