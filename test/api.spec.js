import fetch from 'unfetch'
import api from '../src/api'

jest.mock(
  'react-test-renderer',
  () => ({ create: example => ({ toJSON: () => example }) })
)

jest.mock(
  'unfetch',
  () => jest.fn(() => Promise.resolve(({ json: () => {} })))
)

process.env.SNAPGUIDIST = {}

const name = 'name'
const example = 'example'

test('fires a POST when update is false', () => {
  const update = false
  api.runTest(name, example, update)

  expect(fetch).toHaveBeenCalledWith(
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

test('fires a PUT when update is true', () => {
  const update = true
  api.runTest(name, example, update)

  expect(fetch).toHaveBeenCalledWith(
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
