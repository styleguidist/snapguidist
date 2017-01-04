const bodyParser = require('body-parser')
const cors = require('cors')
const snapshot = require('./snapshot')

const configureServer = (app) => {
  app.use(cors())
  app.use(bodyParser.json())

  app.post('/snapguidist', (req, res) => {
    const result = snapshot(req.body.name, req.body.tree)

    res.send(result)
  })

  app.put('/snapguidist', (req, res) => {
    const update = true
    const result = snapshot(req.body.name, req.body.tree, update)

    res.send(result)
  })
}

module.exports = configureServer
