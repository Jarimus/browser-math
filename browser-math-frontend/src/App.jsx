import { useEffect, useState } from "react"
import MainMenu from "./components/MainMenu"
import { LOCALSTORAGE_USER, URL_HIGHSCORES, URL_MULTIPLICATION_GAME } from "./utils/constants"
import { Routes, Route } from 'react-router-dom'
import MultiplicationGame from "./components/MultiplicationGame"
import Highscores from "./components/Highscores"
import Notification from "./components/Notification"

function App() {
  
  const initialHighscores = [
    {
      name: "Matti",
      multiplication: 5,
    },
    {
      name: "Esa",
      multiplication: 13,
    },{
      name: "Pertti",
      multiplication: 1,
    },
  ]
  
  const [user, setUser] = useState(null)
  const [highscores, setHighscores] = useState(initialHighscores)
  const [notification, setNotification] = useState({
    text: null, color: "green"
  })

  // Check browser storage for login information
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCALSTORAGE_USER)
    setUser(storedUser)
  }, [])

  return (
    <div className="container">
      <h1 className="text-center">Matikkapelit</h1>
      <Routes>
        <Route path='/' element={<MainMenu user={user} setUser={setUser} />} />
        <Route path={URL_MULTIPLICATION_GAME} element={<MultiplicationGame highscores={highscores} setHighscores={setHighscores} setNotification={setNotification} />} />
        <Route path={URL_HIGHSCORES} element={<Highscores highscores={highscores} />} />
      </Routes>
      <Notification notification={notification} />
    </div>
  )

}

export default App