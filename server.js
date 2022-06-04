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
const session = require('express-session')

// controllers
const sessionController = require('./controllers/sessions_controller.js')
const notesController = require('./controllers/notes.js')
const userController = require('./controllers/user_controller.js')
const userPlantsController = require('./controllers/user_plants.js')



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
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)

// routes
app.use(notesController)
app.use(userPlantsController)
app.use("/", userController)
app.use(sessionController)


// redirect for heroku
// app.get('/', (req, res) => {
//   res.redirect('/plants')
// })

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port: 3000'));

// Connect to Mongo
mongoose.connect(PROJECT3_DB  ,  { useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/plants")

// Error / success
mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));
mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
})
