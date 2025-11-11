import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Highscores = ({ highscores }) => {
  const navigate = useNavigate()
  const [gametype, setGametype] = useState("multiplication")

  if (!highscores) {
    return (
      <div className="text-center">
        <p>
          Kukaan ei ole vielä tehnyt ennätyksiä!
        </p>
        <p>
          <button className="btn btn-primary my-3" role="button" onClick={() => {navigate("/")}}>
              Takaisin
          </button>
        </p>
      </div>
    )
  }

  switch (gametype) {
    case "multiplication":
      highscores.sort( (a, b) => b.multiplication - a.multiplication)
      break;
    case "expressions":
      highscores.sort( (a, b) => b.expressions - a.expressions)
      break;
    default:
      highscores.sort( (a, b) => b.multiplication - a.multiplication)
      break;
  }

  const columnStyle = {
    width: "7rem",
  }

  return (
    <div className="text-center">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={columnStyle} >Nimi</th>
            { gametype == "multiplication" && <th style={columnStyle} >Kertolasku</th>}
            { gametype == "expressions" && <th style={columnStyle} >Keksi lauseke</th>}
          </tr>
        </thead>
        <tbody>
          {highscores.map( a => {return (
            <tr key={a.name + a.multiplication} >
              <td>{a.name}</td>
              { gametype == "multiplication" && <td>{a.multiplication ?? 0}</td>}
              { gametype == "expressions" && <td>{a.expressions ?? 0}</td>}
            </tr>
            )}
          )}
        </tbody>
      </table>

      <p>
        <button className="btn btn-primary mx-1" role="button" onClick={() => {setGametype("multiplication")}}>Kertolasku</button>
        <button className="btn btn-primary mx-1" role="button" onClick={() => {setGametype("expressions")}}>Keksi lauseke</button>
      </p>

      <p>
          <button className="btn btn-primary my-1" role="button" onClick={() => {navigate("/")}}>
              Takaisin
          </button>
      </p>
    </div>
  )
}

export default Highscores