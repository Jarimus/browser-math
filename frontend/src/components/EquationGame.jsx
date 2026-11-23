import { useState } from "react"
import MediaQuery from "react-responsive"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"
import { flashTextColor, highscoreCheck, notificationPopUp } from "../utils/helpers"
import { generateEquationProblem } from "../utils/equations"

const EquationGame = ({ degree, highscores, setHighscores, setNotification }) => {

  const navigate = useNavigate()
  const isQuadratic = degree === 2
  const gametype = isQuadratic ? "quadraticEquations" : "linearEquations"

  const [color, setColor] = useState("grey")
  const [score, setScore] = useState(0)
  const [mode, setMode] = useState(isQuadratic ? "" : "normal")
  const [answers, setAnswers] = useState(() => isQuadratic ? ["", ""] : [""])
  const [activeAnswer, setActiveAnswer] = useState(0)
  const [problem, setProblem] = useState(() => isQuadratic ? null : generateEquationProblem(degree))

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  const startGame = (selectedMode) => {
    setMode(selectedMode)
    setScore(0)
    setAnswers(isQuadratic ? ["", ""] : [""])
    setActiveAnswer(0)
    setProblem(generateEquationProblem(degree, selectedMode))
  }

  const newProblem = () => {
    setAnswers(isQuadratic ? ["", ""] : [""])
    setActiveAnswer(0)
    setProblem(generateEquationProblem(degree, mode))
  }

  const setAnswer = (index, value) => {
    setAnswers((previous) => previous.map((answer, i) => i === index ? value : answer))
  }

  const answerLabel = (index) => {
    if (!isQuadratic) return "x"
    return index === 0 ? "x₁" : "x₂"
  }

  const isCorrect = () => {
    const values = answers.map((answer) => Number(answer.replace(",", ".")))
    if (!values.every(Number.isInteger)) return false

    if (!isQuadratic) {
      return values[0] === problem.answers[0]
    }

    // The order of the two answers does not matter.
    const sortedValues = [...values].sort((a, b) => a - b)
    const sortedAnswers = [...problem.answers].sort((a, b) => a - b)
    return sortedValues.every((value, i) => value === sortedAnswers[i])
  }

  const checkCalculation = async () => {
    if (answers.some((answer) => answer.length === 0)) return

    if (isCorrect()) {
      setScore(score + 1)
      flashTextColor("green", "grey", setColor)
      newProblem()
    } else {
      flashTextColor("red", "grey", setColor)
      await highscoreCheck(score, gametype, highscores, setHighscores, setNotification)
      setScore(0)
      setAnswers(isQuadratic ? ["", ""] : [""])
      setActiveAnswer(0)
    }
  }

  if (problem === null) {
    return (
      <div className="text-center">
        <h2>Valitse vaikeustaso</h2>
        <p>Helpossa tilassa ratkaiset vain vaillinaista 2. asteen yhtälöä.</p>

        <p>
          <button className="btn btn-lg btn-primary m-1" role="button" onClick={() => startGame("easy")}>
            Helppo
          </button>
          <button className="btn btn-lg btn-primary m-1" role="button" onClick={() => startGame("normal")}>
            Normaali
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

      <h3>Ratkaise yhtälö.</h3>
      <h2>{problem.equation}</h2>
      {isQuadratic && (
        <p>Anna molemmat ratkaisut. Myös kaksoisjuuri annetaan molempiin vastauksiin.</p>
      )}

      <MediaQuery query="(max-device-width: 800px)">
        <div>
          {answers.map((answer, index) => (
            <button
              key={index}
              type="button"
              className={`btn ${activeAnswer === index ? "btn-primary" : "btn-outline-primary"} m-1`}
              onClick={() => setActiveAnswer(index)}
            >
              {answerLabel(index)} = {answer === "" ? "?" : answer}
            </button>
          ))}
        </div>
        <Numpad
          result={answers[activeAnswer]}
          setResult={(value) => setAnswer(activeAnswer, value)}
          checkCalculation={checkCalculation}
        />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px)">
        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          {answers.map((answer, index) => (
            <span key={index} className="mx-2">
              <label htmlFor={`answer${index}`}>{answerLabel(index)} = </label>
              <input
                id={`answer${index}`}
                value={answer}
                onChange={({ target }) => setAnswer(index, target.value)}
              />
            </span>
          ))}
          <button style={{display: "none"}}>Nappula</button>
        </form>
      </MediaQuery>

      <p>
        <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {highscoreCheck(score, gametype, highscores, setHighscores, setNotification); navigate("/")}}>
          Takaisin
        </button>
        <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {notificationPopUp(setNotification, problem.hint, "black", 10)}}>
          ?
        </button>
      </p>
    </div>
  )
}

export default EquationGame
