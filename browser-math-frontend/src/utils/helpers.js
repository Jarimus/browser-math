export const randomInt = (low, high) => {
  return Math.floor(Math.random()*(high-low+1) + low)
}

export const notificationPopUp = (setNotification, text, color, timer) => {
  setNotification({text: text, color: color})
  setTimeout(() => {
    setNotification({text: null})
  }, timer * 1000);
}