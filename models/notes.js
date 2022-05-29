const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  id: String,
  note: String
})

const Notes = mongoose.model('Note', noteSchema)

module.exports = Notes
