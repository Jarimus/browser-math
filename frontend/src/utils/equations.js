import { randomInt } from "./helpers"

const formatLinearSide = (coefficient, constant) => {
  let side = coefficient === 1 ? "x" : coefficient === -1 ? "-x" : `${coefficient}x`
  if (constant > 0) {
    side += ` + ${constant}`
  } else if (constant < 0) {
    side += ` - ${Math.abs(constant)}`
  }
  return side
}

const formatQuadratic = (firstRoot, secondRoot) => {
  const linearCoefficient = -(firstRoot + secondRoot)
  const constant = firstRoot * secondRoot

  let equation = "x²"
  if (linearCoefficient > 0) {
    equation += linearCoefficient === 1 ? " + x" : ` + ${linearCoefficient}x`
  } else if (linearCoefficient < 0) {
    equation += linearCoefficient === -1 ? " - x" : ` - ${Math.abs(linearCoefficient)}x`
  }

  if (constant > 0) {
    equation += ` + ${constant}`
  } else if (constant < 0) {
    equation += ` - ${Math.abs(constant)}`
  }

  return `${equation} = 0`
}

const generateLinearProblem = () => {
  const answer = randomInt(-9, 9)

  if (Math.random() < 0.5) {
    // Form: ax + b = c
    const coefficient = randomInt(2, 9)
    const constant = randomInt(-9, 9)
    const rightSide = coefficient * answer + constant

    return {
      equation: `${formatLinearSide(coefficient, constant)} = ${rightSide}`,
      answers: [answer],
      hint: "Siirrä vakiotermi toiselle puolelle ja jaa x:n kertoimella.",
    }
  }

  // Form: ax + b = cx + d
  const coefficient = randomInt(2, 9)
  let otherCoefficient = randomInt(2, 9)
  while (otherCoefficient === coefficient) {
    otherCoefficient = randomInt(2, 9)
  }
  const constant = randomInt(-9, 9)
  const otherConstant = (coefficient - otherCoefficient) * answer + constant

  return {
    equation: `${formatLinearSide(coefficient, constant)} = ${formatLinearSide(otherCoefficient, otherConstant)}`,
    answers: [answer],
    hint: "Siirrä x-termi ja vakiotermi omille puolilleen ja jaa x:n kertoimella.",
  }
}

const generateQuadraticProblem = () => {
  const firstRoot = randomInt(-9, 9)
  // Occasionally generate a double root.
  const secondRoot = Math.random() < 0.15 ? firstRoot : randomInt(-9, 9)

  return {
    equation: formatQuadratic(firstRoot, secondRoot),
    answers: [firstRoot, secondRoot],
    hint: "Kirjoita yhtälö muotoon ax² + bx + c = 0 ja ratkaise se esimerkiksi tulon nollasäännöllä.",
  }
}

const generateEasyQuadraticProblem = () => {
  const nonZeroRoot = randomInt(1, 9) * (Math.random() < 0.5 ? 1 : -1)

  // Either b = 0 (roots are opposites) or c = 0 (one root is zero).
  if (Math.random() < 0.5) {
    const firstRoot = nonZeroRoot
    const secondRoot = -nonZeroRoot
    return {
      equation: formatQuadratic(firstRoot, secondRoot),
      answers: [firstRoot, secondRoot],
      hint: "Yhtälössä ei ole x-termiä. Siirrä vakiotermi toiselle puolelle ja ota neliöjuuri.",
    }
  }

  return {
    equation: formatQuadratic(0, nonZeroRoot),
    answers: [0, nonZeroRoot],
    hint: "Yhtälössä ei ole vakiotermiä. Ota x yhteiseksi tekijäksi ja käytä tulon nollasääntöä.",
  }
}

export const generateEquationProblem = (degree, mode = "normal") => {
  if (degree === 2) {
    return mode === "easy" ? generateEasyQuadraticProblem() : generateQuadraticProblem()
  }
  return generateLinearProblem()
}
