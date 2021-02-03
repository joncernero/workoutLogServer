let express = require('express')
let router = express.Router()
let validateSession = require('../middleware/validate-session')
let Log = require('../db').import('../models/log')

//TESTING

router.get('/practice', validateSession, function (req, res) {
  res.send('Hey!! This is a practice route!')
})

router.post('/create', validateSession, function (req, res) {
  const logEntry = {
    description: req.body.logEntry.description,
    definition: req.body.logEntry.definition,
    result: req.body.logEntry.result,
    owner: req.user.id
  }
  Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/', validateSession, (req, res) => {
  let userid = req.user.id
  Log.findAll({
    where: { owner: userid }
  })
    .then(logEntry => res.status(200).json(logEntry))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/:id', validateSession, (req, res) => {
  Log.findAll({
    where: { owner: req.params.id }
  })
    .then(logEntry => res.status(200).json(logEntry))
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/:id', validateSession, function (req, res) {
  const updateLogEntry = {
    description: req.body.logEntry.description,
    definition: req.body.logEntry.definition,
    result: req.body.logEntry.result
  }

  const query = { where: { id: req.params.id, owner: req.user.id } }

  Log.update(updateLogEntry, query)
    .then(logEntry => res.status(200).json(logEntry))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/:id', validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } }

  Log.destroy(query)
    .then(() => res.status(200).json({ message: 'LogEntry Removed' }))
    .catch(err => res.status(500).json({ error: err }))
})
module.exports = router
