const express = require("express")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const usersRouter = require("./controllers/users")

const app = express()

logger.info("Connecting to MongoDB")

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error)
    return
  })

  app.use(express.static("dist"))
  app.use(express.json())

  app.use(middleware.morganLogging)

  // endpoints here
  app.use("/api/users", usersRouter)


  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

module.exports = app