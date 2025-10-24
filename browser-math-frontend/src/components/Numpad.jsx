const Numpad = ({ result, setResult, checkCalculation }) => {

  const handleClick = (e) => {
    const numpadValue = e.target.value
    // First check for clear and enter
    if (numpadValue === "C") {
      setResult(null)
      return
    }
    if (numpadValue === "⏎") {
      checkCalculation()
      return
    }
    // Calculate new value
    const n = Number(numpadValue)
    if (!result) {
      setResult(n)
    } else {
      const newResult = result * 10 + n
      setResult(newResult)
    }
  }

  const numpadButton = (value) => {
    return <button key={value} className="btn btn-lg btn-outline-primary m-0" value={value} onClick={handleClick}>{value}</button>
  }

  return (
    <div>
      <div>
        {[7,8,9].map(n => numpadButton(n))}
      </div>
      <div>
        {[4,5,6].map(n => numpadButton(n))}
      </div>
      <div>
        {[1,2,3].map(n => numpadButton(n))}
      </div>
      <div>
        {["C", 0, "⏎"].map(n => numpadButton(n))}
      </div>
    </div>
  )
}

export default Numpad