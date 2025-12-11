const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  multiplication: {
    type: Number,
    default: 0
  },
  expressions: {
    type: Number,
    default: 0
  },
  conversions: {
    type: Number,
    default: 0
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User