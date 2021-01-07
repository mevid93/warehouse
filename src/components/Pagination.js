import { useSelector, useDispatch } from 'react-redux'
import { pagePrevious, pageNext } from '../reducers/pageReducer'

// component for pagination
const Pagination = () => {

  // redux
  const dispatch = useDispatch()
  const page = useSelector(state => state.page)
  const products = useSelector(state => state.products)

  // style for product
  const pagination = {
    "background": "none",
    "border": "none",
    "padding": 5,
    "color": "#069",
    "textDecoration": "underline",
    "cursor": "pointer"
  }

  // decide if button for next page should be shown
  let showNext = false
  if (products.length - page * 25 > 25) {
    showNext = true
  }

  // render
  return (
    <div>
      <nav>
        {page > 1 && <button style={pagination} onClick={() => dispatch(pagePrevious())}>Previous</button>}
        {showNext && <button style={pagination} onClick={() => dispatch(pageNext())}>Next</button>}
      </nav>
    </div>
  )
}

export default Pagination