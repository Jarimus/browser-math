import { useState } from "react"
import { MediaQuery } from "react-responsive"
import { randomInt, notificationPopUp, flashTextColor, highscoreCheck } from "../utils/helpers.jsx"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"

const MultiplicationGame = ({ setHighscores, highscores, setNotification }) => {

  const [color, setColor] = useState("grey")
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [n1, setN1] = useState(randomInt(2,9))
  const [n2, setN2] = useState(randomInt(2,9))
  const navigate = useNavigate()

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  const checkCalculation = (e) => {
    if (result.length === 0) return
    if (n1 * n2 == result) { // Answer is correct
      setScore(score + 1)
      setN1(randomInt(2,9))
      setN2(randomInt(2,9))
      flashTextColor("green", "grey", setColor)
    } else { // Answer is wrong
      flashTextColor("red", "grey", setColor)
      highscoreCheck(score, "multiplication", highscores, setHighscores, setNotification)
      setScore(0)
    }
    setResult("")
  }

  return (
    <div className="text-center" style={flashStyle}>
      
      <div>
        <h2>
          Pisteet: {score}
        </h2>

        <h2>
          Laske: {`${n1} * ${n2}`}
        </h2>
      </div>

      
      <MediaQuery query="(max-device-width: 800px)">
        <h5>
          Vastaus: {result}
        </h5>
        <Numpad result={result} setResult={setResult} checkCalculation={checkCalculation} />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px">
        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          <input value={result} onChange={({ target }) => setResult(target.value)} />
          <button style={{display: "None"}}>Nappula</button>
        </form>
      </MediaQuery>

      <p>
        <button className="btn btn-lg btn-primary my-3" role="button" onClick={() => {navigate("/")}}>
            Takaisin
        </button>
      </p>
    </div>
  )
}

export default MultiplicationGame