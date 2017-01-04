import api from '../src/api'

jest.mock('react-test-renderer',
  () => ({ create: example => ({ toJSON: () => example }) })
)

global.fetch = jest.fn(
  () => ({ then: () => ({ catch: () => {} }) })
)

process.env.SNAPGUIDIST = {}

const name = 'name'
const example = 'example'

test('calls POST when update is false', () => {
  const update = false
  api.runTest(name, example, update)

  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:3000/snapguidist',
    {
      body: '{"name":"name","tree":"example"}',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  )
})

test('calls PUT when update is true', () => {
  const update = true
  api.runTest(name, example, update)

  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:3000/snapguidist',
    {
      body: '{"name":"name","tree":"example"}',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    }
  )
})
