import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Highscores = ({ highscores }) => {

  const navigate = useNavigate()
  const [gametype, setGametype] = useState("multiplication")

  if (highscores.length == 0) {
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
    case "division":
      highscores.sort( (a, b) => b.division - a.division)
      break;
    case "expressions":
      highscores.sort( (a, b) => b.expressions - a.expressions)
      break;
    case "conversions":
      highscores.sort( (a,b) => b.conversions - a.conversions )
      break;
    case "geometry":
      highscores.sort( (a,b) => (b.geometry ?? 0) - (a.geometry ?? 0) )
      break;
    case "scale":
      highscores.sort( (a,b) => (b.scale ?? 0) - (a.scale ?? 0) )
      break;
    case "linearEquations":
      highscores.sort( (a,b) => (b.linearEquations ?? 0) - (a.linearEquations ?? 0) )
      break;
    case "quadraticEquations":
      highscores.sort( (a,b) => (b.quadraticEquations ?? 0) - (a.quadraticEquations ?? 0) )
      break;
    case "percentConversions":
      highscores.sort( (a,b) => (b.percentConversions ?? 0) - (a.percentConversions ?? 0) )
      break;
    case "percentValue":
      highscores.sort( (a,b) => (b.percentValue ?? 0) - (a.percentValue ?? 0) )
      break;
    case "percentRatio":
      highscores.sort( (a,b) => (b.percentRatio ?? 0) - (a.percentRatio ?? 0) )
      break;
    default:
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
            { gametype == "division" && <th style={columnStyle} >Jakolasku</th>}
            { gametype == "expressions" && <th style={columnStyle} >Keksi lauseke</th>}
            { gametype == "conversions" && <th style={columnStyle} >Yksikkömuunnokset</th>}
            { gametype == "geometry" && <th style={columnStyle} >Piiri ja pinta-ala</th>}
            { gametype == "scale" && <th style={columnStyle} >Mittakaava</th>}
            { gametype == "linearEquations" && <th style={columnStyle} >1. asteen yhtälöt</th>}
            { gametype == "quadraticEquations" && <th style={columnStyle} >2. asteen yhtälöt</th>}
            { gametype == "percentConversions" && <th style={columnStyle} >Prosenttimuunnokset</th>}
            { gametype == "percentValue" && <th style={columnStyle} >Prosenttiarvo</th>}
            { gametype == "percentRatio" && <th style={columnStyle} >Prosenttiluku</th>}
          </tr>
        </thead>
        <tbody>
          {highscores.map( a => (
            <tr key={a.id}>
              <td>{a.username}</td>
              { gametype === "multiplication" && <td>{a.multiplication ?? 0}</td>}
              { gametype === "division" && <td>{a.division ?? 0}</td>}
              { gametype === "expressions" && <td>{a.expressions ?? 0}</td>}
              { gametype === "conversions" && <td>{a.conversions ?? 0}</td>}
              { gametype === "geometry" && <td>{a.geometry ?? 0}</td>}
              { gametype === "scale" && <td>{a.scale ?? 0}</td>}
              { gametype === "linearEquations" && <td>{a.linearEquations ?? 0}</td>}
              { gametype === "quadraticEquations" && <td>{a.quadraticEquations ?? 0}</td>}
              { gametype === "percentConversions" && <td>{a.percentConversions ?? 0}</td>}
              { gametype === "percentValue" && <td>{a.percentValue ?? 0}</td>}
              { gametype === "percentRatio" && <td>{a.percentRatio ?? 0}</td>}
            </tr>
            )
          )}
        </tbody>
      </table>

      <p>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("multiplication")}}>Kertolasku</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("division")}}>Jakolasku</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("expressions")}}>Keksi lauseke</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("conversions")}}>Yksikkömuunnokset</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("geometry")}}>Piiri ja pinta-ala</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("scale")}}>Mittakaava</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("linearEquations")}}>1. asteen yhtälöt</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("quadraticEquations")}}>2. asteen yhtälöt</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("percentConversions")}}>Prosenttimuunnokset</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("percentValue")}}>Prosenttiarvo</button>
        <button className="btn btn-primary m-1" role="button" onClick={() => {setGametype("percentRatio")}}>Prosenttiluku</button>
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