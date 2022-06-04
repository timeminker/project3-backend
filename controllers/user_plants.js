const express = require('express')
const router = express.Router()
const Plants = require('../models/plants.js')
const Notes = require('../models/notes.js')
const seedData = require('../models/seeddata.js')
const User = require('../models/users.js')

router.get('/plants/seed', (req, res) => {
  Plants.create(seedData, (err, data) => {
    res.json(data)
  })
})

router.post('/plants', (req, res) => {
  if (req.body.image === '') {
    req.body.image = 'https://i.imgur.com/EXotp4G.png';
  }
  Plants.create(req.body, (err, addPlant) => {
    res.json(addPlant)
  })
})

router.get('/plants', (req, res) => {
  Plants.find({}, (err, foundPlant) => {
    console.log();
    res.json(foundPlant)
  })
})

router.delete('/plants/:id', (req, res) => {
  Plants.findByIdAndDelete(req.params.id, (err, deletedPlant) => {
    res.json(deletedPlant)
  })
})

router.put('/plants/:id', (req, res) => {
  if (req.body.image === '') {
    req.body.image = 'https://i.imgur.com/EXotp4G.png';
  }
  Plants.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPlant) => {
    res.json(updatedPlant)
  })
})

module.exports = router
