//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Plants = require('./models/plants.js')
const Notes = require('./models/notes.js')

require('dotenv').config()




const app = express()

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const PROJECT3_DB = process.env.PROJECT3_DB

//___________________
//Middleware
//___________________
app.use(express.json())
app.use(cors())




//routes
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

app.put('/notes/:id', (req, res) => {
  Plants.findById(req.params.id, (err, foundPlant) => {
    res.json(foundPlant)
  })
})

app.post('/notes/:id', (req, res) => {
  Notes.create(req.body, (err, review) => {
    Plants.findByIdAndUpdate(req.params.id, {$push:{notes:note}}, {new:true}, (err, newNote) => {
      res.json(newNote)
    })
  })
})

// app.get('/', (req, res) => {
//   res.send('hello world');
// })

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port: 3000'));



// Connect to Mongo
mongoose.connect(PROJECT3_DB  ,  { useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/plants')

// Error / success
mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
})
