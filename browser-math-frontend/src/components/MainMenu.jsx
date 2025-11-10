import { LOCALSTORAGE_USER, URL_EXPRESSION_GAME, URL_HIGHSCORES, URL_MULTIPLICATION_GAME } from "../utils/constants";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const MainMenu = ({ user, setUser }) => {

  const navigate = useNavigate()

  // Reset user information when logging out
  const resetUser = () => {
    setUser(null)
    localStorage.removeItem(LOCALSTORAGE_USER)
  }

  // Show login screen, if no user
  if (!user) {
    return <Login setUser={setUser} />
  }

  // If logged in, show main menu
  return (
    <div className="text-center">

      <p>
        Tervetuloa, {user}!
      </p>

      <p>
        <button className="btn btn-lg btn-primary" role="button" onClick={() => {navigate(URL_MULTIPLICATION_GAME)}}>
            Kertolaskupeli
        </button>
      </p>

      <p>
        <button className="btn btn-lg btn-primary" role="button" onClick={() => {navigate(URL_EXPRESSION_GAME)}}>
            Keksi lauseke -peli
        </button>
      </p>

      <p>
        <button className="btn btn-lg btn-primary" role="button" onClick={() => {navigate(URL_HIGHSCORES)}}>
            Ennätykset
        </button>
      </p>

      <p>
        <button className="btn btn-lg btn-secondary" type="button" onClick={resetUser}>
            Kirjaudu ulos
        </button>
      </p>
    
    </div>
  )
}

export default MainMenu