const Notification = ({ message }) => {

  console.log(message)

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message.message === null) {
    return null
  }
  else {
    if (message.type == 'green') {
      return (
        <div style={successStyle}>
          {message.message}
        </div>
      )
      }
    else {
      return (
        <div style={errorStyle}>
          {message.message}
        </div>
      )
    }
  }
}

export default Notification