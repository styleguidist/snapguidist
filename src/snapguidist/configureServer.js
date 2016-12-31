import bodyParser from 'body-parser'
import cors from 'cors'
import snapshot from './snapshot'

export default function configureServer(app) {
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
