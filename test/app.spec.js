jest.mock('../src/snapguidist')

const request = require('supertest-as-promised')
const snapguidist = require('../src/snapguidist')
const app = require('../src/app')

test('calls snapguidist with name and tree', () => {
  const name = 'name'
  const tree = { type: 'div' }

  return request(app)
    .post('/')
    .send({ name, tree })
    .then(() => expect(snapguidist).toBeCalledWith(name, tree))
})

test('calls snapguidist with name, tree and update', () => {
  const name = 'name'
  const tree = { type: 'div' }
  const update = true

  return request(app)
    .put('/')
    .send({ name, tree })
    .then(() => expect(snapguidist).toBeCalledWith(name, tree, update))
})
