const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Plants = require('./models/plants.js')

require('dotenv').config()

const PORT = process.env.PORT

const PROJECT3_DB = process.env.PROJECT3_DB

const app = express()
app.use(express.json())
app.use(cors())



// routes
// app.post('/plants', (req, res) => {
//   Plants.create(req.body, (err, addPlant) => {
//     res.json(addPlant)
//   })
// })
//
// app.get('/plants', (req, res) => {
//   Plants.find({}, (err, foundPlant) => {
//     res.json(foundPlant)
//   })
// })
//
// app.delete('/plants/:id', (req, res) => {
//   Plants.findByIdAndDelete(req.params.id, (err, deletedPlant) => {
//     res.json(deletedPlant)
//   })
// })
//
// app.put('/plants/:id', (req, res) => {
//   Plants.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPlant) => {
//     res.json(updatedPlant)
//   })
// })

app.get('/', (req, res) => {
  res.send('hello world');
})


app.listen(PORT, () => {
  console.log('listening on port: 3000');
})
// Connect to Mongo
mongoose.connect(PROJECT3_DB  ,  { useNewUrlParser: true});

// Error / success
mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
})
