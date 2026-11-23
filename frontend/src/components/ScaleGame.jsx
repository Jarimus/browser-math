import { useState } from "react"
import MediaQuery from "react-responsive"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"
import { flashTextColor, highscoreCheck, notificationPopUp } from "../utils/helpers"
import { generateScaleProblem } from "../utils/scale"

const ScaleGame = ({ highscores, setHighscores, setNotification }) => {

  const navigate = useNavigate()
  const [color, setColor] = useState("grey")
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [problem, setProblem] = useState(() => generateScaleProblem())

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  const newProblem = () => {
    setResult("")
    setProblem(generateScaleProblem())
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
      await highscoreCheck(score, "scale", highscores, setHighscores, setNotification)
      setScore(0)
      setResult("")
    }
  }

  return (
    <div className="text-center" style={flashStyle}>

      <h2>Pisteet: {score}</h2>

      <h3>{problem.prompt}</h3>

      <MediaQuery query="(max-device-width: 800px)">
        <h5>
          Vastaus: {result} m
        </h5>
        <Numpad result={result} setResult={setResult} checkCalculation={checkCalculation} />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px)">
        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          <input value={result} onChange={({ target }) => setResult(target.value)} />
          <span className="mx-2">m</span>
          <button style={{display: "none"}}>Nappula</button>
        </form>
      </MediaQuery>

      <p>
        <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {highscoreCheck(score, "scale", highscores, setHighscores, setNotification); navigate("/")}}>
          Takaisin
        </button>
        <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {notificationPopUp(setNotification, problem.hint, "black", 10)}}>
          ?
        </button>
      </p>
    </div>
  )
}

export default ScaleGame
