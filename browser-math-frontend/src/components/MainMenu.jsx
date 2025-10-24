import { Button } from "react-bootstrap"
import { LOCALSTORAGE_USER, URL_MULTIPLICATION_GAME } from "../utils/constants";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const MainMenu = ({ user, setUser }) => {

  const navigate = useNavigate()

  // Reset user information when logging out
  const resetUser = () => {
    setUser(null)
    localStorage.removeItem(LOCALSTORAGE_USER)
  }

  if (!user) {
    return <Login setUser={setUser} />
  }

  return (
    <div className="text-center">

      <p>
        Tervetuloa, {user}!
      </p>

      <p>
        <button className="btn btn-primary col-6" role="button" onClick={() => {navigate(URL_MULTIPLICATION_GAME)}}>
            Kertolasku
        </button>
      </p>

      <p>
        <button className="btn btn-secondary col-6" type="button" onClick={resetUser}>
            Kirjaudu ulos
        </button>
      </p>
    
    </div>
  )
}

export default MainMenu