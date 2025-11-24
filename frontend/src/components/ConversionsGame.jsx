import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { lengths, times, weights } from "../utils/conversions"

const ConversionsGame = () => {

    const [ practiceSet, setPracticeSet ] = useState([])
    const checkboxesRef = useRef({})
    const navigate = useNavigate()

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

        console.log(newSet.map( v => v.name ))
        setPracticeSet(newSet)
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

                    <button className="btn btn-primary my-1" role="button" onClick={addPracticeSets} >
                        Valitse
                    </button>       
            
            </div>
        )
    }

    return (
        <div className="text-center">
            <h2>Yksikkömuunnokset</h2>
            <p>
                {practiceSet.map( (s) => <div>{s.name} {s.conversions.map( v => v.name + ", ")}</div>)}
            </p>
            <p>
            <button className="btn btn-primary my-1" role="button" onClick={() => {navigate("/")}}>
                Takaisin
            </button>
            </p>
        </div>
    )
}

export default ConversionsGame