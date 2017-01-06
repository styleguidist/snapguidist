import express from 'express'
import request from 'supertest'
import snapshot from '../../src/core/snapshot'
import configureServer from '../../src/core/configureServer'

jest.mock(
  '../../src/core/snapshot',
  () => jest.fn()
)

const app = express()
configureServer(app)

test('calls snapshot with name and tree', () => {
  const name = 'name'
  const update = false
  const treeSource = { type: 'div' }
  const tree = JSON.stringify(treeSource)

  const result = [name, treeSource, update]

  return request(app)
    .post('/snapguidist')
    .send([{ name, tree, update }])
    .then(() => expect(snapshot).toBeCalledWith(...result))
})

