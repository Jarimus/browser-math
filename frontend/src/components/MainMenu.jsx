import { LOCALSTORAGE_USER, URL_CONVERSIONS_GAME, URL_DIVISION_GAME, URL_EXPRESSION_GAME, URL_GEOMETRY_GAME, URL_HIGHSCORES, URL_LINEAR_EQUATIONS_GAME, URL_MULTIPLICATION_GAME, URL_PERCENT_CONVERSIONS_GAME, URL_PERCENT_RATIO_GAME, URL_PERCENT_VALUE_GAME, URL_QUADRATIC_EQUATIONS_GAME, URL_SCALE_GAME } from "../utils/constants";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const gameCategories = [
  {
    name: "Peruslaskutoimitukset",
    games: [
      { name: "Kertolasku", url: URL_MULTIPLICATION_GAME },
      { name: "Jakolasku", url: URL_DIVISION_GAME },
      { name: "Keksi lauseke", url: URL_EXPRESSION_GAME },
      { name: "Yksikkömuunnokset", url: URL_CONVERSIONS_GAME },
    ],
  },
  {
    name: "Geometria",
    games: [
      { name: "Piiri ja pinta-ala", url: URL_GEOMETRY_GAME },
      { name: "Mittakaava", url: URL_SCALE_GAME },
    ],
  },
  {
    name: "Yhtälöt",
    games: [
      { name: "1. asteen yhtälöt", url: URL_LINEAR_EQUATIONS_GAME },
      { name: "2. asteen yhtälöt", url: URL_QUADRATIC_EQUATIONS_GAME },
    ],
  },
  {
    name: "Prosenttilasku",
    games: [
      { name: "Prosenttimuunnokset", url: URL_PERCENT_CONVERSIONS_GAME },
      { name: "Prosenttiarvo", url: URL_PERCENT_VALUE_GAME },
      { name: "Prosenttiluku", url: URL_PERCENT_RATIO_GAME },
    ],
  }
]

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
      {gameCategories.map(category => (
        <div key={category.name}>
          <h2 className="h4 mt-4">{category.name}</h2>
          {category.games.map(game => (
            <p key={game.name}>
              <button className="btn btn-lg btn-primary" role="button" onClick={() => {navigate(game.url)}}>
                  {game.name}
              </button>
            </p>
          ))}
        </div>
      ))}

      <h2 className="h4 mt-4">Muuta</h2>

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