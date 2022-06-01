const express = require('express')
const router = express.Router()
const Plants = require('../models/plants.js')
const Notes = require('../models/notes.js')


router.put('/notes/:id', (req, res) => {
  Plants.findById(req.params.id, (err, foundPlant) => {
    res.json(foundPlant)
  })
})

router.post('/notes/:id', (req, res) => {
  Notes.create(req.body, (err, note) => {
    Plants.findByIdAndUpdate(req.params.id, {$push:{notes:note}}, {new:true}, (err, newNote) => {
      res.json(newNote)
    })
  })
})

router.delete('/notes/:id/:id2', (req, res) => {
  Plants.updateOne({_id: req.params.id}, {$pull:{notes:{_id:req.params.id2}}}, {new:true}, (err, deletedNote) => {
    res.json(deletedNote)
  })
})

module.exports = router
