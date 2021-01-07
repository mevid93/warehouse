import { categoryChange } from '../reducers/categoryReducer'
import { useDispatch } from 'react-redux'
import listingService from '../services/listingService'
import { productsChange } from '../reducers/productsReducer'

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
    listingService
      .getAll(category)
      .then(products => dispatch(productsChange(products)))
      .catch(error => console.log(error))
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