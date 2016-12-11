const express = require('express')
const bodyParser = require('body-parser')
const snapguidist = require('./snapguidist')

const app = express()
app.use(bodyParser.json())

app.post('/', (req, res) => {
  const result = snapguidist(req.body.name, req.body.tree)

  res.send(result)
})

app.put('/', (req, res) => {
  const update = true
  const result = snapguidist(req.body.name, req.body.tree, update)

  res.send(result)
})

module.exports = app
