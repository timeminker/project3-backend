const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// routes

app.listen(3000, () => {
  console.log('listening on port 3000...');
})

mongoose.connect('mongodb://localhost:27017/')

mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
})
