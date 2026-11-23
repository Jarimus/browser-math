import { useState } from "react"
import MediaQuery from "react-responsive"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"
import { flashTextColor, highscoreCheck } from "../utils/helpers"
import { generatePercentValueProblem } from "../utils/percentages"

const PercentValueGame = ({ highscores, setHighscores, setNotification }) => {

  const navigate = useNavigate()
  const [color, setColor] = useState("grey")
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [problem, setProblem] = useState(() => generatePercentValueProblem())

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  const newProblem = () => {
    setResult("")
    setProblem(generatePercentValueProblem())
  }

  const checkCalculation = async () => {
    if (result.length === 0) return
    // Replace comma with a dot: then result will properly cast to a number
    const fixedResult = result.replace(",", ".")
    if (Math.abs(Number(fixedResult) - problem.answer) < 0.000001) {
      setScore(score + 1)
      flashTextColor("green", "grey", setColor)
      newProblem()
    } else {
      flashTextColor("red", "grey", setColor)
      await highscoreCheck(score, "percentValue", highscores, setHighscores, setNotification)
      setScore(0)
      setResult("")
    }
  }

  return (
    <div className="text-center" style={flashStyle}>

      <h2>Pisteet: {score}</h2>

      <h2>{problem.prompt}</h2>

      <MediaQuery query="(max-device-width: 800px)">
        <h5>
          Vastaus: {result}
        </h5>
        <Numpad result={result} setResult={setResult} checkCalculation={checkCalculation} />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px)">
        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          <input value={result} onChange={({ target }) => setResult(target.value)} />
          <button style={{display: "none"}}>Nappula</button>
        </form>
      </MediaQuery>

      <p>
        <button className="btn btn-lg btn-primary my-3" role="button" onClick={() => {highscoreCheck(score, "percentValue", highscores, setHighscores, setNotification); navigate("/")}}>
          Takaisin
        </button>
      </p>
    </div>
  )
}

export default PercentValueGame
