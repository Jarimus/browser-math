import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { lengths, times, weights } from "../utils/conversions"
import NumPad from "./Numpad"
import { flashTextColor, highscoreCheck } from "../utils/helpers"
import MediaQuery from "react-responsive"

const ConversionsGame = ({ setHighscores, highscores, setNotification }) => {

    const [ color, setColor ] = useState("grey")
    const [ score, setScore ] = useState(0)
    const [ practiceSet, setPracticeSet ] = useState([])
    const [ result, setResult ] = useState("")
    const [ problem, setProblem ] = useState({
        targetName: "",
        targetValue: 0,
        sourceName: "",
        sourceValue: 0
    })
    const checkboxesRef = useRef({})
    const navigate = useNavigate()

    const flashStyle = {
    color: color,
    transition: "color 0.2s ease-in-out"
  }

    const addPracticeSets = (e) => {
        e.preventDefault()
        
        const selectedValues = Object.values(checkboxesRef.current)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

        const newSet = []
        if (selectedValues.includes("lengths")) {
            newSet.push(lengths)
        }
        if (selectedValues.includes("weights")) {
            newSet.push(weights)
        }
        if (selectedValues.includes("times")) {
            newSet.push(times)
        }

        setPracticeSet(newSet)
        newProblem(newSet)
    }

    const newProblem = (set) => {
        setResult("")
        // Choose a set from the practice sets.
        const unitSet = set[Math.floor(Math.random()*set.length)]

        // Choose two units from the set
        const i = Math.floor(Math.random()*(unitSet.conversions.length-1))
        const [ unit1, unit2 ] = [ unitSet.conversions[i], unitSet.conversions[i+1] ]
        
        // Randomize source and target
        let sourceUnit
        let targetUnit
        if (Math.random() < 0.5) {
            targetUnit = unit1
            sourceUnit = unit2
        } else {
            targetUnit = unit2
            sourceUnit = unit1
        }
        
        // Randomize initial value
        let initialValue = Math.round((Math.random() * 1000)) / 100
        // Handle times (s, min, h, day) differently
        if (unitSet.name == "times") {
            initialValue = Math.round(Math.random() * 3 + 2)
        }
        // Take into account conversion from smaller unit to bigger unit
        if (targetUnit.magnitude > sourceUnit.magnitude) initialValue *= targetUnit.magnitude / sourceUnit.magnitude
        // Calulate target value
        const targetValue = initialValue * sourceUnit.magnitude / targetUnit.magnitude

        setProblem({
            targetName: targetUnit.name,
            targetValue: targetValue,
            sourceName: sourceUnit.name,
            sourceValue: initialValue
        })

    }

    const checkCalculation = async () => {
        const fixedResult = result.replace(",", ".")
        if (result.length === 0) return
        const diff = Math.abs( Number(fixedResult) - problem.targetValue)
        if ( diff < 0.1 ) {
            setScore(score + 1)
            flashTextColor("green", "grey", setColor)
            newProblem(practiceSet)
        } else {
            flashTextColor("red", "grey", setColor)
            await highscoreCheck(score, "conversions", highscores, setHighscores, setNotification)
            setScore(0)
        }
    }

    if ( practiceSet.length == 0 ) {
        return (
            <div className="text-center">
                <h2>Valitse harjoiteltavat yksiköt</h2>

                    <div>
                        <input className="mx-2" type="checkbox" name="chooseSets" id="lengthSet" value="lengths" ref={(el) => (checkboxesRef.current['lengthSet'] = el)} />
                        <label htmlFor="lengthSet">Pituudet (km, m, cm, mm)</label>
                    </div>
                    <div>
                        <input className="mx-2" type="checkbox" name="chooseSets" id="weightSet" value="weights" ref={(el) => (checkboxesRef.current['weightSet'] = el)} />
                        <label htmlFor="weightSet">Painot (kg, g, mg)</label>
                    </div>
                    <div>
                        <input className="mx-2" type="checkbox" name="chooseSets" id="timeSet" value="times" ref={(el) => (checkboxesRef.current['timeSet'] = el)} />
                        <label htmlFor="timeSet">Ajan yksiköt (s, min, h, pv)</label>
                    </div>

                    <button className="btn btn-primary m-1" role="button" onClick={addPracticeSets} >
                        Valitse
                    </button>
                    <button className="btn btn-primary btn-primary m-1" role="button" onClick={() => {navigate("/")}}>
                        Takaisin
                    </button>
            
            </div>
        )
    }

    return (
        <div className="text-center" style={flashStyle}>
            
            <h2>Pisteet: {score}</h2>

            <MediaQuery query="(max-device-width: 800px)">
            <h2>
                {problem.sourceValue} {problem.sourceName} = {result === "" ? "?": result} {problem.targetName}
            </h2>
            <NumPad result={result} setResult={setResult} checkCalculation={checkCalculation} />
            </MediaQuery>

            <MediaQuery query="(min-device-width: 800px">
            <h2>
                {problem.sourceValue} {problem.sourceName} = ? {problem.targetName}
            </h2>
            <form onSubmit={(e) => {e.preventDefault(); checkCalculation()}}>
                <input value={result} onChange={({ target }) => setResult(target.value)} />
                <button style={{display: "None"}}>Nappula</button>
            </form>
            </MediaQuery>
            
            <p>
            <button className="btn btn-primary my-1" role="button" onClick={() => {navigate("/")}}>
                Takaisin
            </button>
            </p>

        </div>
    )
}

export default ConversionsGame