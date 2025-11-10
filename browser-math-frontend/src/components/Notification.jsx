const Notification = ({ notification, setNotification }) => {
  const notificationStyle = {
    color: notification.color ?? "",
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    opacity: notification.visible ? 1 : 0,
    transition: 'opacity 1s ease-in-out'
  }

  return (
    <div className="text-center" style={notificationStyle} onClick={() => {setNotification({...notification, visible: false})}} >
      {notification.text}
    </div>
  )
}

export default Notification