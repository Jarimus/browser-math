import { useState } from "react"
import { MediaQuery } from "react-responsive"
import { randomInt, flashTextColor, highscoreCheck } from "../utils/helpers.jsx"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"

const DivisionGame = ({ setHighscores, highscores, setNotification }) => {

  const [color, setColor] = useState("grey")
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState("")
  const [divisor, setDivisor] = useState(randomInt(2,9))
  const [quotient, setQuotient] = useState(randomInt(2,9))
  const navigate = useNavigate()

  const dividend = divisor * quotient

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  const newProblem = () => {
    setDivisor(randomInt(2,9))
    setQuotient(randomInt(2,9))
  }

  const checkCalculation = async () => {
    if (answer.length === 0) return
    if (Number(answer) === quotient) { // Answer is correct
      setScore(score + 1)
      newProblem()
      flashTextColor("green", "grey", setColor)
    } else { // Answer is wrong
      flashTextColor("red", "grey", setColor)
      await highscoreCheck(score, "division", highscores, setHighscores, setNotification)
      setScore(0)
    }
    setAnswer("")
  }

  return (
    <div className="text-center" style={flashStyle}>

      <div>
        <h2>
          Pisteet: {score}
        </h2>

        <h2>
          {`${dividend} / ${divisor}`} = ?
        </h2>
      </div>

      <MediaQuery query="(max-device-width: 800px)">
        <h5>
          Vastaus: {answer}
        </h5>
        <Numpad result={answer} setResult={setAnswer} checkCalculation={checkCalculation} />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px)">
        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          <input value={answer} onChange={({ target }) => setAnswer(target.value)} />
          <button style={{display: "none"}}>Nappula</button>
        </form>
      </MediaQuery>

      <p>
        <button className="btn btn-lg btn-primary my-3" role="button" onClick={() => {highscoreCheck(score, "division", highscores, setHighscores, setNotification); navigate("/")}}>
            Takaisin
        </button>
      </p>
    </div>
  )
}

export default DivisionGame
