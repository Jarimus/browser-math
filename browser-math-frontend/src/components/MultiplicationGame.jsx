import { useState } from "react"
import { MediaQuery } from "react-responsive"
import { randomInt, notificationPopUp } from "../utils/helpers"
import { useNavigate } from "react-router-dom"
import '../utils/firework.css'
import shootFirework from "../utils/firework"
import Numpad from "./Numpad"
import { LOCALSTORAGE_USER } from "../utils/constants"

const MultiplicationGame = ({ setHighscores, highscores, setNotification }) => {

  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [n1, setN1] = useState(randomInt(2,9))
  const [n2, setN2] = useState(randomInt(2,9))
  const navigate = useNavigate()

  const checkCalculation = (e) => {
    if (result.length === 0) return
    if (n1 * n2 == result) {
      setScore(score + 1)
      shootFirework("firework")
      setN1(randomInt(2,9))
      setN2(randomInt(2,9))
    } else {
      if (score > 0) {
        const username = localStorage.getItem(LOCALSTORAGE_USER)
        const previousScore = highscores.find( item => item.name == username)
        if (!previousScore) {
          notificationPopUp(setNotification, `Uusi oma ennätys!\n${score} pistettä.`, "green", 5)
          setHighscores(highscores.concat({
            name: localStorage.getItem(LOCALSTORAGE_USER),
            multiplication: score
          }))
        } else if (previousScore.multiplication < score) {
          notificationPopUp(setNotification, `Uusi oma ennätys!\n${score} pistettä.`, "green", 5)
          setHighscores(highscores.map( item => item.name === username ? {...item, multiplication: score} : item))
        } else {
          notificationPopUp(setNotification, `Tuloksesi oli ${score} pistettä. Ennätyksesi on ${previousScore.multiplication}.`, "green", 5)
        }
      }
      setScore(0)
    }
    setResult("")
  }

  return (
    <div className="text-center">

      <h5>
        Pisteet: {score}
      </h5>

      <h5>
        Laske: {`${n1} * ${n2}`}
      </h5>

      
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
        <button className="btn btn-primary my-3" role="button" onClick={() => {navigate("/")}}>
            Takaisin
        </button>
      </p>

      <div id="firework"></div>

    </div>
  )
}

export default MultiplicationGame