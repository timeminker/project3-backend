const mongoose = require('mongoose');
const Schema = mongoose.schema
const Notes = require('./notes.js')

const plantSchema = new mongoose.Schema({
  name: {type:String, required:true, unique:true},
  scientificName: String,
  image: String,
  sunlight: {type: Number, max:5},
  water: {type: Number, max:5},
  notes: [Notes.schema]
})

const Plants = mongoose.model('Plant', plantSchema)

module.exports = Plants
