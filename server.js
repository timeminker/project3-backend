//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
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


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

mongoose.connect('mongodb://localhost:27017/')

mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
})
