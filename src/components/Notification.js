import { useSelector } from 'react-redux'

// notification component for displaying notifications
const Notification = ({ error }) => {

  // redux
  const notification = useSelector(state => state.notification)

  if (notification === null || notification === undefined) return (null)

  // component style
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }
  if(error) notificationStyle.color = "red"

  // render
  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

export default Notification