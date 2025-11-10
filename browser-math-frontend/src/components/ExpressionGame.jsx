import { useEffect, useState } from "react"
import MediaQuery from "react-responsive"
import { useNavigate } from "react-router-dom"
import Numpad from "./Numpad"
import { flashTextColor, generateRandomExpression, notificationPopUp, randomInt, safeEval } from "../utils/helpers"

const ExpressionGame = ({ setNotification }) => {

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
    const count = randomInt(2, Math.floor(score / 10) + 2)
    for (let i=0;i<count;i++) {
      newNumbers.push(randomInt(2, 9))
    }
    setNumbers(newNumbers)

    let generated = { expression: "", result: -1}
    while (generated.result < 0 || generated.result > score*10 + 30) {
      generated = generateRandomExpression(newNumbers)
    }
    setTarget(generated.result)
  }

  const checkCalculation = () => {
    let userResult = 0
    try {
      userResult = safeEval(result)
    } catch {
      notificationPopUp(setNotification, "Väärin muotoiltu lauseke", "red", 5)
    }
    setResult("")
    if (userResult == target) {
      setScore(score + 1)
      flashTextColor("green", "grey", setColor, 200)
      newProblem()
    } else {
      setScore(0)
      flashTextColor("red", "grey", setColor, 200)
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