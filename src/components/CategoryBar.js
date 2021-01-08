import { categoryChange } from '../reducers/categoryReducer'
import { useDispatch } from 'react-redux'
import productService from '../services/productService'
import { productsChange } from '../reducers/productsReducer'
import { pageChange } from '../reducers/pageReducer'

// navigation component where different product categories are listed
const CategoryBar = ({ categories }) => {

  // redux state
  const dispatch = useDispatch()

  // component style
  const categoryBarStyle = {
    "background": "none",
    "border": "none",
    "padding": 5,
    "color": "#069",
    "textDecoration": "underline",
    "cursor": "pointer"
  }

  // function to execute when catecory name is clicked
  const handleCategoryClick = (category) => {
    productService
      .getAll(category)
      .then(products => {
        dispatch(pageChange(1))
        dispatch(productsChange(products))
      })
      .catch(() => "Error: could not load products!")
    dispatch(categoryChange(category))
  }

  // render
  return (
    <div>
      <nav>
        {categories.map(c =>
          <button key={c.id} style={categoryBarStyle} onClick={() => handleCategoryClick(c.name)}>
            {c.name}
          </button>
        )}
      </nav>
    </div>
  )
}

export default CategoryBar