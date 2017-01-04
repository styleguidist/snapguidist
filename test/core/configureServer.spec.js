import express from 'express'
import request from 'supertest'
import snapshot from '../../src/core/snapshot'
import configureServer from '../../src/core/configureServer'

jest.mock('../../src/core/snapshot')

const app = express()
configureServer(app)

test('calls snapshot with name and tree', () => {
  const name = 'name'
  const tree = { type: 'div' }

  return request(app)
    .post('/snapguidist')
    .send({ name, tree })
    .then(() => expect(snapshot).toBeCalledWith(name, tree))
})

test('calls snapshot with name, tree and update', () => {
  const name = 'name'
  const tree = { type: 'div' }
  const update = true

  return request(app)
    .put('/snapguidist')
    .send({ name, tree })
    .then(() => expect(snapshot).toBeCalledWith(name, tree, update))
})
