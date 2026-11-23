import { randomInt } from "./helpers"

// Places with the forms needed for "from ... to ...": kotoa koululle.
export const PLACES = [
  { id: "koti", from: "kotoa", to: "kotiin" },
  { id: "koulu", from: "koululta", to: "koululle" },
  { id: "ravintola", from: "ravintolalta", to: "ravintolalle" },
  { id: "rautatieasema", from: "rautatieasemalta", to: "rautatieasemalle" },
  { id: "työpaikka", from: "työpaikalta", to: "työpaikalle" },
  { id: "kauppa", from: "kaupalta", to: "kaupalle" },
]

const formatScale = (scale) => scale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

export const generateScaleProblem = () => {
  const mapDistance = randomInt(2, 9)
  // The scale is one non-zero digit followed by four or five zeroes,
  // e.g. 1:30000 or 1:300000. Keep it within 1:10000 - 1:500000.
  const zeroCount = randomInt(4, 5)
  const maxLeadingDigit = zeroCount === 4 ? 9 : 5
  const leadingDigit = randomInt(1, maxLeadingDigit)
  const scale = leadingDigit * 10 ** zeroCount

  const fromIndex = randomInt(0, PLACES.length - 1)
  let toIndex = randomInt(0, PLACES.length - 2)
  // Pick a second, different place.
  if (toIndex >= fromIndex) {
    toIndex += 1
  }
  const from = PLACES[fromIndex]
  const to = PLACES[toIndex]

  return {
    prompt: `Kartalla etäisyys ${from.from} ${to.to} on ${mapDistance} cm. Kartan mittakaava on 1:${formatScale(scale)}. Kuinka pitkä matka on metreinä?`,
    // Map distance (cm) times the scale gives the real distance in cm.
    // The scale is a multiple of 100, so the answer in metres is a whole number.
    answer: mapDistance * scale / 100,
    hint: "Todellinen etäisyys = kartan etäisyys · mittakaava. Muista muuntaa senttimetrit metreiksi.",
  }
}
