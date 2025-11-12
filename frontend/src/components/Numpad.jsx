const Numpad = ({ result, setResult, checkCalculation }) => {

  const handleClick = (e) => {
    const n = e.target.value
    // First check for special buttons
    if (n === "C") {
      setResult("")
      return
    }
    if (n === "⏎") {
      checkCalculation()
      return
    }
    // Calculate new value
    if (result.length === 0) {
      setResult(n)
    } else {
      const newResult = `${result}${n}`
      setResult(newResult)
    }
  }

  const buttonStyle = {
    width: "15vw",
    height: "15vw"
  }

  const numpadButton = (value) => {
    return <button key={value} style={buttonStyle} className="btn btn-lg btn-outline-primary m-1" value={value} onClick={handleClick}>{value}</button>
  }

  return (
    <div>
      <div>
        {["7","8","9", "+"].map(n => numpadButton(n))}
      </div>
      <div>
        {["4","5","6", "-"].map(n => numpadButton(n))}
      </div>
      <div>
        {["1","2","3", "*"].map(n => numpadButton(n))}
      </div>
      <div>
        {["C", "0", ",", "/"].map(n => numpadButton(n))}
      </div>
      <div>
        {["(", ")", "^", "⏎"].map(n => numpadButton(n))}
      </div>
    </div>
  )
}

export default Numpad