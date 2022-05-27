//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Plants = require('./models/plants.js')

require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI

const app = express()
require('dotenv').config()

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

//___________________
//Middleware
//___________________
app.use(express.json())
app.use(cors())



// routes
app.post('/plants', (req, res) => {
  Plants.create(req.body, (err, addPlant) => {
    res.json(addPlant)
  })
})

app.get('/plants', (req, res) => {
  Plants.find({}, (err, foundPlant) => {
    res.json(foundPlant)
  })
})

app.delete('/plants/:id', (req, res) => {
  Plants.findByIdAndDelete(req.params.id, (err, deletedPlant) => {
    res.json(deletedPlant)
  })
})

app.put('/plants/:id', (req, res) => {
  Plants.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPlant) => {
    res.json(updatedPlant)
  })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));


app.listen(PORT, () => {
  console.log('listening on port: 3000');
})

mongoose.connect(MONGODB_URI, () => {
  console.log('connected to mongo');
})

mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
})
