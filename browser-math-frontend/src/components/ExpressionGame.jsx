import { useEffect, useState } from "react"
import MediaQuery from "react-responsive"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"
import { flashTextColor, generateRandomExpression, highscoreCheck, notificationPopUp, randomInt, safeEval, validateNumbersUsed } from "../utils/helpers"

const ExpressionGame = ({ highscores, setHighscores, setNotification }) => {

  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")
  const [numbers, setNumbers] = useState([])
  const [target, setTarget] = useState(0)
  const [color, setColor] = useState("grey")

  const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

  useEffect(() => {
    newProblem()
  }, [])

  const info = () => {
    notificationPopUp(setNotification, "Muodosta lauseke, jonka vastaus on oltava annettu vastaus. Käytä vain annettuja lukuja.", "black", 10)
  }

  const newProblem = () => {
    let newNumbers = []
    const count = randomInt(3, Math.min(Math.floor(score / 10) + 3, 5))
    for (let i=0;i<count;i++) {
      newNumbers.push(randomInt(2, 9))
    }
    setNumbers(newNumbers)

    let problem = { expression: "", result: -1}
    while (problem.result < 0 || problem.result > score*2 + 20 || !Number.isInteger(problem.result)) {
      problem = generateRandomExpression(newNumbers)
    }
    setTarget(problem.result)
  }

  const checkCalculation = () => {
    if (!validateNumbersUsed(result, numbers)) {
      notificationPopUp(setNotification, "Käytä vain annettuja numeroita.", "red", 5)
      return
    }
    let userResult = 0
    try {
      userResult = safeEval(result)
    } catch {
      notificationPopUp(setNotification, "Väärin muotoiltu lauseke.", "red", 5)
      return
    }
    if (userResult == target) {
      setScore(score + 1)
      flashTextColor("green", "grey", setColor, 200)
      newProblem()
      setResult("")
    } else {
      flashTextColor("red", "grey", setColor, 200)
      highscoreCheck(score, "expressions", highscores, setHighscores, setNotification)
      setScore(0)
    }
  }

  return (
    <div className="text-center" style={flashStyle} >
      
      <div>
        <h2>
          Pisteet: {score}
        </h2>

        <h2>
          Luvut: {numbers.join(", ")}
        </h2>

      </div>

      
      <MediaQuery query="(max-device-width: 800px)">
        <h2>
          {result} = {target}
        </h2>
        <Numpad result={result} setResult={setResult} checkCalculation={checkCalculation} />
      </MediaQuery>

      <MediaQuery query="(min-device-width: 800px">

        <h2>
          Lausekkeen tulos: {target}
        </h2>

        <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
          <input value={result} onChange={({ target }) => setResult(target.value)} />
          <button style={{display: "None"}}>Nappula</button>
        </form>
      </MediaQuery>

      <div>
          <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {navigate("/")}}>
              Takaisin
          </button>
          <button className="btn btn-lg btn-primary m-2" role="button" onClick={() => {info()}}>
              ?
          </button>
      </div>

    </div>
  )
}

export default ExpressionGame