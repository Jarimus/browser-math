import { useState } from "react"

const MultiplicationGame = () => {
  
  const randomInt = (low, high) => {
    return Math.floor(Math.random()*(high-low+1) + low)
  }

  const [score, setScore] = useState(0)
  const [n1, setN1] = useState(randomInt(2,9))
  const [n2, setN2] = useState(randomInt(2,9))


  const checkCalculation = (e) => {
    e.preventDefault()
    const calculation = e.target.calculation.value
    console.log(`Onko ${n1} + ${n2} yhtä suuri kuin ${calculation}?`)

    if (n1 + n2 == calculation) {
      console.log("oikein!")
      setScore(score + 1)
    } else {
      console.log("Väärin!")
    }
    setN1(randomInt(2,10))
    setN2(randomInt(2,10))
    e.target.calculation.value = ""
  }

  return (
    <div className="text-center">
      <p>
        Pisteet: {score}
      </p>
      <p>
        Laske: {`${n1} + ${n2}`}
      </p>
      <form onSubmit={checkCalculation}>
        <label>
          <input name="calculation" type="number" />
        </label>
      </form>
    </div>
  )
}

export default MultiplicationGame