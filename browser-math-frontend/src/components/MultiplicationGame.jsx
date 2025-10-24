import { useState } from "react"
import { randomInt } from "../utils/helpers"
import { useNavigate } from "react-router-dom"
import '../utils/firework.css'
import shootFirework from "../utils/firework"

const MultiplicationGame = () => {

  const [score, setScore] = useState(0)
  const [n1, setN1] = useState(randomInt(2,9))
  const [n2, setN2] = useState(randomInt(2,9))
  const navigate = useNavigate()

  const checkCalculation = (e) => {
    e.preventDefault()
    const calculation = e.target.calculation.value

    if (n1 * n2 == calculation) {
      setScore(score + 1)
      shootFirework("firework")
    }
    setN1(randomInt(2,9))
    setN2(randomInt(2,9))
    e.target.calculation.value = ""
  }

  return (
    <div className="text-center">

      <p>
        Pisteet: {score}
      </p>

      <p>
        Laske: {`${n1} * ${n2}`}
      </p>

        <form onSubmit={checkCalculation}>
          <input name="calculation" type="number" />
        </form>

      <p>
        <button className="btn btn-primary" role="button" onClick={() => {navigate("/")}}>
            Takaisin
        </button>
      </p>

      <div id="firework"></div>

    </div>
  )
}

export default MultiplicationGame