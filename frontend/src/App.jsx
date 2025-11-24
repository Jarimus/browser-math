import { useEffect, useState } from "react"
import MainMenu from "./components/MainMenu"
import { LOCALSTORAGE_USER, URL_CONVERSIONS_GAME, URL_EXPRESSION_GAME, URL_HIGHSCORES, URL_MULTIPLICATION_GAME } from "./utils/constants"
import { Routes, Route } from 'react-router-dom'
import MultiplicationGame from "./components/MultiplicationGame"
import Highscores from "./components/Highscores"
import Notification from "./components/Notification"
import ExpressionGame from "./components/ExpressionGame"
import { getAllUsers } from "./services/users"
import { notificationPopUp } from "./utils/helpers"
import ConversionsGame from "./components/ConversionsGame"

function App() {
  
  const [user, setUser] = useState(null)
  const [highscores, setHighscores] = useState([])
  const [notification, setNotification] = useState({
    text: "", color: "green", visible: false
  })

  useEffect(() => {
    // Get highscores from database
    getAllUsers()
      .then( (data) => {
        setHighscores(data)
      })
      .catch( (error) => {
        notificationPopUp(setNotification, `tietojen haku epäonnistui: ${error.message}`, "red", 5)
      })

    // Read the user from browser's local storage
    const storedUser = localStorage.getItem(LOCALSTORAGE_USER)
    setUser(storedUser)
  }, [])

  return (
    <div className="container">
      <h1 className="text-center">Matikkapelit</h1>
      <Routes>
        <Route
          path='/'
          element={<MainMenu user={user} setUser={setUser} />} />
        <Route 
          path={URL_MULTIPLICATION_GAME}
          element={<MultiplicationGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_CONVERSIONS_GAME}
          element={<ConversionsGame />} />
        <Route
          path={URL_EXPRESSION_GAME}
          element={<ExpressionGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_HIGHSCORES}
          element={<Highscores highscores={highscores} />} />
      </Routes>

      <Notification notification={notification} setNotification={setNotification} />

    </div>
  )

}

export default App