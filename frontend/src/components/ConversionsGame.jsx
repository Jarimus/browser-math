import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { conversionsSet, timeSetName } from "../utils/conversions"
import NumPad from "./Numpad"
import { flashTextColor, highscoreCheck, randomInt } from "../utils/helpers"
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
        for (const set of conversionsSet) {
            if (selectedValues.includes(set.name)) {
                newSet.push(set)
            }
        }

        setPracticeSet(newSet)
        newProblem(newSet)
    }

    const newProblem = (set) => {
        setResult("")
        // Choose a set from the practice sets.
        const unitSet = set[Math.floor(Math.random()*set.length)]

        // Choose two units from the set
        const i = randomInt(0, unitSet.conversions.length - 1)
        const unit1 = unitSet.conversions[i]
        const j = randomInt(0, unit1.pairsWith.length - 1)
        const targetUnitName = unit1.pairsWith[j]
        const unit2 = unitSet.conversions.find( v => v.name == targetUnitName )
        
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

        // Calculate initial value and target value. Smaller value: 0.1 - 999
        let targetValue
        let initialValue
        if (sourceUnit.magnitude < targetUnit.magnitude) {
            targetValue = (randomInt(1,990) / 10).toFixed(1)
            initialValue = (targetValue * targetUnit.magnitude / sourceUnit.magnitude).toFixed(1)
        } else {
            initialValue = (randomInt(1,990) / 10).toFixed(1)
            targetValue = (initialValue * sourceUnit.magnitude / targetUnit.magnitude).toFixed(1)
        }

        // Handle times (s, min, h, day) differently
        if (unitSet.name == timeSetName) {
            if (sourceUnit.magnitude > targetUnit.magnitude) {
                initialValue = randomInt(2,4)
                targetValue = initialValue * sourceUnit.magnitude / targetUnit.magnitude
            } else {
                targetValue = randomInt(2,4)
                initialValue = targetValue * targetUnit.magnitude / sourceUnit.magnitude
            }
        }

        setProblem({
            targetName: targetUnit.name,
            targetValue: targetValue,
            sourceName: sourceUnit.name,
            sourceValue: initialValue
        })

    }

    const checkCalculation = async () => {
        // Replace comma with a dot: then result will properly cast to a number
        if (result.length === 0) return
        const fixedResult = result.replace(",", ".")
        // target value is not accurate due to floats. Calculate difference, which should be small
        const diffPercent = (Math.abs( Number(fixedResult) - problem.targetValue)) / problem.targetValue
        if ( diffPercent < 10 ** (-10) ) { // Handle correct answer
            setScore(score + 1)
            flashTextColor("green", "grey", setColor)
            newProblem(practiceSet)
        } else { // Handle wrong answer
            flashTextColor("red", "grey", setColor)
            await highscoreCheck(score, "conversions", highscores, setHighscores, setNotification)
            setScore(0)
        }
    }

    if ( practiceSet.length == 0 ) {
        return (
            <div className="text-center">
                <h2>Valitse harjoiteltavat yksiköt</h2>

                    {
                        conversionsSet.map( (set) => { return (
                            <div key={set.name + "ID"}>
                                <input className="mx-2" type="checkbox" name="chooseSets" id={set.name + "ID"} value={set.name} ref={(el) => (checkboxesRef.current[set.name] = el)} />
                            <label htmlFor={set.name + "ID"}>{set.name} ({set.conversions.map( v => v.name).join(", ")})</label>
                            </div>
                        )})
                    }

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