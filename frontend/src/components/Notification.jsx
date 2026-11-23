const Notification = ({ notification, setNotification }) => {
  const notificationStyle = {
    color: notification.color ?? "",
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: notification.visible ? 'auto' : 'none',
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