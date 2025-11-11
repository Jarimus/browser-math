const usersRouter = require('express').Router()
const User = require('../models/user')

// GET: all
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users).end()
})

// POST
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const user = new User({
    username: body.username,
    multiplication: body.multiplication ?? 0,
    expressions: body.expressions ?? 0
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// PUT
usersRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const dbUser = await User.findById(id)
  if (!dbUser) {
    const user = new User({
      username: body.username,
      multiplication: body.multiplication ?? 0,
      expressions: body.expressions ?? 0
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
    return
  }
  const savedUser = await dbUser.updateOne({
    multiplication: body.multiplication,
    expressions: body.expressions
  })
  response.status(204).json(savedUser)
})

module.exports = usersRouter