import { randomInt } from "./helpers"

const percentUnitGroups = [
  [
    { symbol: "cm", elative: "senttimetristä", symbolElative: "cm:stä", magnitude: 0.01 },
    { symbol: "m", elative: "metristä", symbolElative: "m:stä", magnitude: 1 },
    { symbol: "km", elative: "kilometristä", symbolElative: "km:stä", magnitude: 1000 },
  ],
  [
    { symbol: "s", elative: "sekunnista", symbolElative: "s:stä", magnitude: 1 },
    { symbol: "min", elative: "minuutista", symbolElative: "min:stä", magnitude: 60 },
  ],
  [
    { symbol: "kg", elative: "kilogrammasta", symbolElative: "kg:sta", magnitude: 1000 },
    { symbol: "g", elative: "grammasta", symbolElative: "g:sta", magnitude: 1 },
    { symbol: "mg", elative: "milligrammasta", symbolElative: "mg:sta", magnitude: 0.001 },
  ],
]

// Unit pairs where the smaller unit is the part and the larger unit is the whole.
const conversionPairs = [
  { part: percentUnitGroups[0][0], whole: percentUnitGroups[0][1] },
  { part: percentUnitGroups[0][1], whole: percentUnitGroups[0][2] },
  { part: percentUnitGroups[1][0], whole: percentUnitGroups[1][1] },
  { part: percentUnitGroups[2][1], whole: percentUnitGroups[2][0] },
  { part: percentUnitGroups[2][2], whole: percentUnitGroups[2][1] },
]

const randomUnit = () => {
  const group = percentUnitGroups[randomInt(0, percentUnitGroups.length - 1)]
  return group[randomInt(0, group.length - 1)]
}

export const generatePercentConversionProblem = (mode) => {
  // Easy mode uses integer percentages. Hard mode uses one decimal place.
  const percentage = mode === "easy"
    ? randomInt(1, 100)
    : randomInt(1, 149) + randomInt(1, 9) / 10
  const decimal = Math.round(percentage * 10) / 1000

  if (Math.random() < 0.5) {
    return {
      prompt: `${percentage} % = ?`,
      answer: decimal,
      answerSuffix: "",
    }
  }

  return {
    prompt: `${decimal} = ? %`,
    answer: percentage,
    answerSuffix: "%",
  }
}

export const generatePercentValueProblem = () => {
  const percentage = randomInt(1, 150)
  const value = randomInt(10, 300)
  const unit = randomUnit()

  return {
    prompt: `Kuinka paljon on ${percentage} % ${value} ${unit.elative}?`,
    answer: value * percentage / 100,
    answerSuffix: "",
  }
}

const generateSameUnitRatioProblem = () => {
  const unit = randomUnit()
  const wholeValue = randomInt(1, 15) * 20
  const percentage = randomInt(1, 20) * 5
  const partValue = wholeValue * percentage / 100

  return {
    prompt: `Kuinka monta prosenttia ${partValue} ${unit.symbol} on ${wholeValue} ${unit.symbolElative}?`,
    answer: percentage,
    answerSuffix: "%",
  }
}

const generateConvertedRatioProblem = () => {
  const pair = conversionPairs[randomInt(0, conversionPairs.length - 1)]
  const wholeValue = randomInt(1, 5)
  const percentage = randomInt(1, 20) * 5
  const partValue = Math.round(
    wholeValue * pair.whole.magnitude * percentage / (100 * pair.part.magnitude)
  )

  return {
    prompt: `Kuinka monta prosenttia ${partValue} ${pair.part.symbol} on ${wholeValue} ${pair.whole.symbolElative}?`,
    answer: percentage,
    answerSuffix: "%",
  }
}

export const generatePercentRatioProblem = (mode) => {
  if (mode === "hard" && Math.random() < 0.6) {
    return generateConvertedRatioProblem()
  }

  return generateSameUnitRatioProblem()
}
