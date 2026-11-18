const Label = ({ x, y, text, anchor = "middle", rotate }) => {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="15"
      fill="currentColor"
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {text}
    </text>
  )
}

const ShapeDiagram = ({ problem }) => {
  const { shapeId, property, dimensions } = problem

  const shapeStyle = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
  }

  const heightLine = (x, top, bottom) => {
    return (
      <>
        <line x1={x} y1={top} x2={x} y2={bottom} stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
        <path d={`M ${x} ${bottom - 10} L ${x + 10} ${bottom - 10} L ${x + 10} ${bottom}`} fill="none" stroke="currentColor" strokeWidth="1.5" />
      </>
    )
  }

  let diagram = null

  switch (shapeId) {
    case "square":
      diagram = (
        <>
          <rect x="105" y="55" width="110" height="110" style={shapeStyle} />
          <Label x={160} y={180} text={`sivu ${dimensions.side} cm`} />
        </>
      )
      break
    case "rectangle":
      diagram = (
        <>
          <rect x="65" y="60" width="190" height="100" style={shapeStyle} />
          <Label x={160} y={180} text={`${dimensions.base} cm`} />
          <Label x={278} y={115} text={`${dimensions.height} cm`} />
        </>
      )
      break
    case "parallelogram":
      diagram = (
        <>
          <polygon points="110,70 280,70 240,160 70,160" style={shapeStyle} />
          {heightLine(110, 70, 160)}
          <Label x={155} y={180} text={`${dimensions.base} cm`} />
          <Label x={135} y={115} text={`${dimensions.height} cm`} />
          <Label x={86} y={108} text={`${dimensions.side} cm`} anchor="end" />
        </>
      )
      break
    case "triangle":
      diagram = (
        <>
          <polygon points="70,160 250,160 145,60" style={shapeStyle} />
          {property === "area" ? (
            <>
              {heightLine(145, 60, 160)}
              <Label x={160} y={180} text={`${dimensions.base} cm`} />
              <Label x={170} y={125} text={`${dimensions.height} cm`} />
            </>
          ) : (
            <>
              <Label x={160} y={195} text={`a = ${dimensions.sides[0]} cm`} />
              <Label x={100} y={105} text={`b = ${dimensions.sides[1]} cm`} anchor="end" />
              <Label x={205} y={105} text={`c = ${dimensions.sides[2]} cm`} anchor="start" />
            </>
          )}
        </>
      )
      break
    default:
      diagram = null
  }

  return (
    <svg
      viewBox="0 0 320 220"
      width="100%"
      style={{ maxWidth: "320px" }}
      role="img"
      aria-label={`${problem.shapeName}, ${problem.propertyName}`}
    >
      {diagram}
    </svg>
  )
}

export default ShapeDiagram
