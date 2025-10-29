import { useNavigate } from "react-router-dom"

const Highscores = ({ highscores }) => {
  const navigate = useNavigate()

  if (!highscores) {
    return (
      <div className="text-center">
        <p>
          No highscores yet
        </p>
        <p>
          <button className="btn btn-primary my-3" role="button" onClick={() => {navigate("/")}}>
              Takaisin
          </button>
        </p>
      </div>
    )
  }

  highscores.sort( (a, b) => b.multiplication - a.multiplication)

  return (
    <div className="text-center">
      <table className="table">
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Kertolaskut</th>
          </tr>
        </thead>
        <tbody>
          {highscores.map( a => {return (
            <tr key={a.name + a.multiplication}>
              <td>{a.name}</td>
              <td>{a.multiplication}</td>
            </tr>
            )}
          )}
        </tbody>
      </table>

      <p>
          <button className="btn btn-primary my-3" role="button" onClick={() => {navigate("/")}}>
              Takaisin
          </button>
      </p>
    </div>
  )
}

export default Highscores