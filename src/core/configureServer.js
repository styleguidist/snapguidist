const bodyParser = require('body-parser')
const cors = require('cors')
const snapshot = require('./snapshot')

const configureServer = (app) => {
  app.use(cors())
  app.use(bodyParser.json())

  app.post('/snapguidist', (req, res) => {
    const snapshots = req.body

    const results = snapshots.reduce((acc, snapshotInfo) => {
      const { name, tree, update } = snapshotInfo
      const renderedTree = JSON.parse(tree)
      acc[name] = snapshot(name, renderedTree, update)
      return acc
    }, {})

    res.send(results)
  })
}

module.exports = configureServer
