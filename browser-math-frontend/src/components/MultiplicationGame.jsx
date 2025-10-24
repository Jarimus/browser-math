import { useState } from "react"
import { randomInt } from "../utils/helpers"
import { useNavigate } from "react-router-dom"
import '../utils/firework.css'
import shootFirework from "../utils/firework"
import Numpad from "./Numpad"

const MultiplicationGame = () => {

  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null)
  const [n1, setN1] = useState(randomInt(2,9))
  const [n2, setN2] = useState(randomInt(2,9))
  const navigate = useNavigate()

  const checkCalculation = () => {
    if (!result) return
    if (n1 * n2 == result) {
      setScore(score + 1)
      shootFirework("firework")
      setN1(randomInt(2,9))
      setN2(randomInt(2,9))
    } else {
      setScore(0)
    }
    setResult(null)
  }

  return (
    <div className="text-center">

      <p>
        Pisteet: {score}
      </p>

      <p>
        Laske: {`${n1} * ${n2}`}
      </p>

      <p>
        Vastaus: {result}
      </p>
      
      <Numpad result={result} setResult={setResult} checkCalculation={checkCalculation} />

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