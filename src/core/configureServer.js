const bodyParser = require('body-parser')
const cors = require('cors')
const snapshot = require('./snapshot')

function configureServer(app) {
  app.use(cors())
  app.use(bodyParser.json())

  app.post('/', (req, res) => {
    const result = snapshot(req.body.name, req.body.tree)

    res.send(result)
  })

  app.put('/', (req, res) => {
    const update = true
    const result = snapshot(req.body.name, req.body.tree, update)

    res.send(result)
  })
}
module.exports = configureServer
