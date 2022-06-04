const bcrypt = require('bcrypt')
const express = require('express')
const user = express.Router()
const User = require('../models/users.js')

user.get('/createaccount', (req, res) => {
  User.find({},  (err, foundUser) => {
    res.json(foundUser)
  })
  //console.log(req.body);
})


user.post('/createaccount', (req, res) => {
  //console.log(res);
  //res.send(req.body)
  //console.log(req);
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log(createdUser);
    if(err){
      console.log(err);
      res.json('username taken')
      res.json(err.message)
    } else {
      console.log('user is created', createdUser);
      res.json(createdUser)
    }
  })
});


user.put('/login', (req, res) => {
  // console.log(req.body);
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(err) {
      res.json('Oops, there was an error. Please try again')
    } else {
      if(!foundUser){
        res.json('Username and password do not match. Please try again.')
      } else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({username: foundUser.username})
      } else {
        res.json('Username and password do not match. Please try again.')
      }
    }
  })
});

module.exports = user
