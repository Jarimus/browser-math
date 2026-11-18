import { randomInt } from "./helpers"

export const SHAPES = [
  { id: "square", name: "Neliö" },
  { id: "rectangle", name: "Suorakulmio" },
  { id: "parallelogram", name: "Suunnikas" },
  { id: "triangle", name: "Kolmio" },
]

export const PROPERTY_MODES = [
  { id: "perimeter", name: "Piiri" },
  { id: "area", name: "Pinta-ala" },
  { id: "both", name: "Molemmat" },
]

const formula = (shapeId, property) => {
  switch (shapeId) {
    case "square":
      return property === "area" ? "Pinta-ala = sivu · sivu" : "Piiri = 4 · sivu"
    case "rectangle":
      return property === "area" ? "Pinta-ala = kanta · korkeus" : "Piiri = 2 · (kanta + korkeus)"
    case "parallelogram":
      return property === "area" ? "Pinta-ala = kanta · korkeus" : "Piiri = 2 · (kanta + sivu)"
    case "triangle":
      return property === "area" ? "Pinta-ala = (kanta · korkeus) / 2" : "Piiri = a + b + c"
    default:
      return ""
  }
}

const generateSquare = (property) => {
  const side = randomInt(2, 10)
  return {
    dimensions: { side },
    answer: property === "area" ? side * side : 4 * side,
  }
}

const generateRectangle = (property) => {
  const base = randomInt(2, 10)
  const height = randomInt(2, 10)
  return {
    dimensions: { base, height },
    answer: property === "area" ? base * height : 2 * (base + height),
  }
}

const generateParallelogram = (property) => {
  const base = randomInt(3, 10)
  const side = randomInt(4, 15)
  // The height must be shorter than the slanted side.
  const height = randomInt(2, side - 1)
  return {
    dimensions: { base, side, height },
    answer: property === "area" ? base * height : 2 * (base + side),
  }
}

const generateTrianglePerimeter = () => {
  const a = randomInt(2, 12)
  const b = randomInt(2, 12)
  // Ensure the three sides form a valid triangle.
  const low = Math.max(2, Math.abs(a - b) + 1)
  const high = Math.min(15, a + b - 1)
  const c = randomInt(low, high)
  return {
    dimensions: { sides: [a, b, c] },
    answer: a + b + c,
  }
}

const generateTriangleArea = () => {
  const base = randomInt(2, 12)
  let height = randomInt(2, 12)
  // Keep the area a whole number.
  if ((base * height) % 2 !== 0) {
    height = height === 15 ? 14 : height + 1
  }
  return {
    dimensions: { base, height },
    answer: (base * height) / 2,
  }
}

export const generateProblem = (shapeIds, propertyMode) => {
  const candidates = SHAPES.filter((shape) => shapeIds.includes(shape.id))
  const shape = candidates[randomInt(0, candidates.length - 1)]
  const property = propertyMode === "both"
    ? (Math.random() < 0.5 ? "perimeter" : "area")
    : propertyMode

  let data
  switch (shape.id) {
    case "square":
      data = generateSquare(property)
      break
    case "rectangle":
      data = generateRectangle(property)
      break
    case "parallelogram":
      data = generateParallelogram(property)
      break
    case "triangle":
      data = property === "area" ? generateTriangleArea() : generateTrianglePerimeter()
      break
    default:
      data = generateSquare(property)
  }

  return {
    shapeId: shape.id,
    shapeName: shape.name,
    property,
    propertyName: property === "area" ? "pinta-ala" : "piiri",
    formula: formula(shape.id, property),
    ...data,
  }
}
