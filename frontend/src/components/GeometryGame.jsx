import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MediaQuery from "react-responsive"
import Numpad from "./Numpad"
import ShapeDiagram from "./ShapeDiagram"
import { flashTextColor, highscoreCheck, notificationPopUp } from "../utils/helpers"
import { generateProblem, PROPERTY_MODES, SHAPES } from "../utils/shapes"

const GeometryGame = ({ highscores, setHighscores, setNotification }) => {

  const [color, setColor] = useState("grey")
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [selectedShapes, setSelectedShapes] = useState([])
  const [propertyMode, setPropertyMode] = useState("")
  const [problem, setProblem] = useState(null)
  const navigate = useNavigate()

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  const toggleShape = (shapeId) => {
    setSelectedShapes((previous) => (
      previous.includes(shapeId)
        ? previous.filter((id) => id !== shapeId)
        : previous.concat(shapeId)
    ))
  }

  const canStart = selectedShapes.length > 0 && propertyMode !== ""

  const startGame = () => {
    if (!canStart) return
    setScore(0)
    setResult("")
    setProblem(generateProblem(selectedShapes, propertyMode))
  }

  const newProblem = () => {
    setResult("")
    setProblem(generateProblem(selectedShapes, propertyMode))
  }

  const checkCalculation = async () => {
    if (result.length === 0) return
    // Replace comma with a dot: then result will properly cast to a number
    const fixedResult = result.replace(",", ".")
    if (Number(fixedResult) === problem.answer) { // Answer is correct
      setScore(score + 1)
      flashTextColor("green", "grey", setColor)
      newProblem()
    } else { // Answer is wrong
      flashTextColor("red", "grey", setColor)
      await highscoreCheck(score, "geometry", highscores, setHighscores, setNotification)
      setScore(0)
      setResult("")
    }
  }

  if (problem === null) {
    return (
      <div className="text-center">
        <h2>Valitse harjoiteltavat muodot</h2>

        {SHAPES.map((shape) => (
          <div key={shape.id}>
            <input
              className="mx-2"
              type="checkbox"
              id={shape.id + "ID"}
              checked={selectedShapes.includes(shape.id)}
              onChange={() => toggleShape(shape.id)}
            />
            <label htmlFor={shape.id + "ID"}>{shape.name}</label>
          </div>
        ))}

        <h2 className="mt-3">Valitse harjoiteltava suure</h2>

        {PROPERTY_MODES.map((mode) => (
          <div key={mode.id}>
            <input
              className="mx-2"
              type="radio"
              name="propertyMode"
              id={mode.id + "ID"}
              value={mode.id}
              checked={propertyMode === mode.id}
              onChange={() => setPropertyMode(mode.id)}
            />
            <label htmlFor={mode.id + "ID"}>{mode.name}</label>
          </div>
        ))}

        {!canStart && (
          <p className="mt-3">Valitse vähintään yksi muoto ja harjoiteltava suure.</p>
        )}

        <p>
          <button className="btn btn-primary m-1" role="button" onClick={startGame} disabled={!canStart}>
            Aloita
          </button>
          <button className="btn btn-primary m-1" role="button" onClick={() => {navigate("/")}}>
            Takaisin
          </button>
        </p>
      </div>
    )
  }

  const unit = problem.property === "area" ? "cm²" : "cm"

  return (
    <div className="text-center" style={flashStyle}>

      <h2>Pisteet: {score}</h2>

      <h4>{problem.shapeName}</h4>

      <div className="my-2">
        <ShapeDiagram problem={problem} />
      </div>

      <h3>
        Laske {problem.propertyName}.
      </h3>

      <MediaQuery query="(max-device-width: 800px)">
        <h5>
          Vastaus: {result} {unit}
        </h5>
        <Numpad result={result} setResult={setResult} checkCalculation={checkCalculation} />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px)">
        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          <input value={result} onChange={({ target }) => setResult(target.value)} />
          <span className="mx-2">{unit}</span>
          <button style={{display: "none"}}>Nappula</button>
        </form>
      </MediaQuery>

      <div>
        <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {highscoreCheck(score, "geometry", highscores, setHighscores, setNotification); navigate("/")}}>
          Takaisin
        </button>
        <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {notificationPopUp(setNotification, problem.formula, "black", 10)}}>
          ?
        </button>
      </div>

    </div>
  )
}

export default GeometryGame
