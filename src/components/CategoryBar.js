
const CategoryBar = ({categories, setCategory}) => {

  const categoryBarStyle = {
    "background": "none",
    "border": "none",
    "padding": 5,
    "color": "#069",
    "textDecoration": "underline",
    "cursor": "pointer"
  }

  return (
    <div>
      <nav>
        {categories.map(c => <button key={c.id} style={categoryBarStyle} href="" onClick={() => setCategory(c.name)}>{c.name}</button>)}
      </nav>
    </div>
  )
}

export default CategoryBar