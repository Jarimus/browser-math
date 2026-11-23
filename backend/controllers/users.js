const usersRouter = require('express').Router()
const User = require('../models/user')

// GET: all
usersRouter.get('/', async (_request, response) => {
  const users = await User.find({})
  response.json(users).end()
})

// POST
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const user = new User({
    username: body.username,
    multiplication: body.multiplication ?? 0,
    division: body.division ?? 0,
    expressions: body.expressions ?? 0,
    conversions: body.conversions ?? 0,
    geometry: body.geometry ?? 0,
    scale: body.scale ?? 0,
    linearEquations: body.linearEquations ?? 0,
    quadraticEquations: body.quadraticEquations ?? 0,
    percentConversions: body.percentConversions ?? 0,
    percentValue: body.percentValue ?? 0,
    percentRatio: body.percentRatio ?? 0
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// PUT
usersRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id
  let data = await User.findByIdAndUpdate(id, { ...body })
  if (!data) {
    response.status(404).end()
    return
  }
  data["expressions"] = body.expressions ?? data["expressions"]
  data["multiplication"] = body.multiplication ?? data["multiplication"]
  data["division"] = body.division ?? data["division"]
  data["conversions"] = body.conversions ?? data["conversions"]
  data["geometry"] = body.geometry ?? data["geometry"]
  data["scale"] = body.scale ?? data["scale"]
  data["linearEquations"] = body.linearEquations ?? data["linearEquations"]
  data["quadraticEquations"] = body.quadraticEquations ?? data["quadraticEquations"]
  data["percentConversions"] = body.percentConversions ?? data["percentConversions"]
  data["percentValue"] = body.percentValue ?? data["percentValue"]
  data["percentRatio"] = body.percentRatio ?? data["percentRatio"]
  response.status(200).json(data).end()
})

module.exports = usersRouter