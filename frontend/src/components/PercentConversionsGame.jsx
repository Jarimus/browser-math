import { useState } from "react"
import MediaQuery from "react-responsive"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"
import { flashTextColor, highscoreCheck } from "../utils/helpers"
import { generatePercentConversionProblem } from "../utils/percentages"

const PercentConversionsGame = ({ highscores, setHighscores, setNotification }) => {

  const navigate = useNavigate()
  const [mode, setMode] = useState("")
  const [color, setColor] = useState("grey")
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [problem, setProblem] = useState(null)

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  const startGame = (selectedMode) => {
    setMode(selectedMode)
    setScore(0)
    setResult("")
    setProblem(generatePercentConversionProblem(selectedMode))
  }

  const newProblem = () => {
    setResult("")
    setProblem(generatePercentConversionProblem(mode))
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
      await highscoreCheck(score, "percentConversions", highscores, setHighscores, setNotification)
      setScore(0)
      setResult("")
    }
  }

  if (problem === null) {
    return (
      <div className="text-center">
        <h2>Valitse vaikeustaso</h2>
        <p>Helpossa tilassa prosentit ovat kokonaislukuja.</p>

        <p>
          <button className="btn btn-lg btn-primary m-1" role="button" onClick={() => startGame("easy")}>
            Helppo
          </button>
          <button className="btn btn-lg btn-primary m-1" role="button" onClick={() => startGame("hard")}>
            Vaikea
          </button>
        </p>
        <p>
          <button className="btn btn-primary m-1" role="button" onClick={() => {navigate("/")}}>
            Takaisin
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className="text-center" style={flashStyle}>

      <h2>Pisteet: {score}</h2>

      <h2>{problem.prompt}</h2>

      <MediaQuery query="(max-device-width: 800px)">
        <h5>
          Vastaus: {result}{problem.answerSuffix && ` ${problem.answerSuffix}`}
        </h5>
        <Numpad result={result} setResult={setResult} checkCalculation={checkCalculation} />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px)">
        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          <input value={result} onChange={({ target }) => setResult(target.value)} />
          {problem.answerSuffix && <span className="mx-2">{problem.answerSuffix}</span>}
          <button style={{display: "none"}}>Nappula</button>
        </form>
      </MediaQuery>

      <p>
        <button className="btn btn-lg btn-primary my-3" role="button" onClick={() => {highscoreCheck(score, "percentConversions", highscores, setHighscores, setNotification); navigate("/")}}>
          Takaisin
        </button>
      </p>
    </div>
  )
}

export default PercentConversionsGame
