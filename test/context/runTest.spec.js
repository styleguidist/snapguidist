import runTest from '../../src/context/runTest'

jest.mock(
  '../../src/helpers/console',
  () => {}
)

global.fetch = jest.fn(
  () => ({ then: () => ({ catch: () => {} }) })
)

process.env.SNAPGUIDIST = { serverInfo: {} }

const name = 'name'
const example = 'example'
const snapshot = JSON.stringify({ name, tree: example })

test('fires a POST when update is false', () => {
  const update = false
  runTest(snapshot, update)

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

test('fires a PUT when update is true', () => {
  const update = true
  runTest(snapshot, update)

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
