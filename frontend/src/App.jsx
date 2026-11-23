import { useEffect, useState } from "react"
import MainMenu from "./components/MainMenu"
import { LOCALSTORAGE_USER, URL_CONVERSIONS_GAME, URL_DIVISION_GAME, URL_EXPRESSION_GAME, URL_GEOMETRY_GAME, URL_HIGHSCORES, URL_LINEAR_EQUATIONS_GAME, URL_MULTIPLICATION_GAME, URL_PERCENT_CONVERSIONS_GAME, URL_PERCENT_RATIO_GAME, URL_PERCENT_VALUE_GAME, URL_QUADRATIC_EQUATIONS_GAME, URL_SCALE_GAME } from "./utils/constants"
import { Routes, Route } from 'react-router-dom'
import MultiplicationGame from "./components/MultiplicationGame"
import DivisionGame from "./components/DivisionGame"
import Highscores from "./components/Highscores"
import Notification from "./components/Notification"
import ExpressionGame from "./components/ExpressionGame"
import { getAllUsers } from "./services/users"
import { notificationPopUp } from "./utils/helpers"
import ConversionsGame from "./components/ConversionsGame"
import GeometryGame from "./components/GeometryGame"
import ScaleGame from "./components/ScaleGame"
import EquationGame from "./components/EquationGame"
import PercentConversionsGame from "./components/PercentConversionsGame"
import PercentValueGame from "./components/PercentValueGame"
import PercentRatioGame from "./components/PercentRatioGame"

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
      <Notification notification={notification} setNotification={setNotification} />
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
          path={URL_DIVISION_GAME}
          element={<DivisionGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_CONVERSIONS_GAME}
          element={<ConversionsGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_EXPRESSION_GAME}
          element={<ExpressionGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_GEOMETRY_GAME}
          element={<GeometryGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_SCALE_GAME}
          element={<ScaleGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_LINEAR_EQUATIONS_GAME}
          element={<EquationGame
            degree={1}
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_QUADRATIC_EQUATIONS_GAME}
          element={<EquationGame
            degree={2}
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_PERCENT_CONVERSIONS_GAME}
          element={<PercentConversionsGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_PERCENT_VALUE_GAME}
          element={<PercentValueGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_PERCENT_RATIO_GAME}
          element={<PercentRatioGame
            highscores={highscores}
            setHighscores={setHighscores}
            setNotification={setNotification} />} />
        <Route
          path={URL_HIGHSCORES}
          element={<Highscores highscores={highscores} />} />
      </Routes>


    </div>
  )

}

export default App