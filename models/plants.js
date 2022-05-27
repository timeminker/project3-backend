const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {type:String, required:true, unique:true},
  scientificName: String,
  image: String,
  sunlight: {type: Number, max:5},
  water: {type: Number, max:5}
})

const Plants = mongoose.model('Plant', plantSchema)

module.exports = Plants
