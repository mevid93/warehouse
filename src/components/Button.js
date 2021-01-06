
const Button = ({ text, handler }) => {
  return (
    <div>
      <button onClick={handler}>
        {text}
      </button>
    </div>
  )
}

export default Button