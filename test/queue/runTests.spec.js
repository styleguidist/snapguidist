import runTests from '../../src/queue/runTests'

jest.mock(
  '../../src/helpers/console',
  () => {}
)

global.fetch = jest.fn(
  () => ({ then: () => ({ catch: () => {} }) })
)

global.process = {
  env: {
    SNAPGUIDIST: {
      serverHost: 'localhost',
      serverPort: 3000,
    },
  },
}

const name = 'name'
const example = 'example'

beforeEach(() => global.fetch.mockClear())

test('fires a POST when update is false', () => {
  const update = false
  const snapshots = [{ name, tree: { name, tree: example }, update }]
  runTests(snapshots)

  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:3000/snapguidist',
    {
      body: '[{"name":"name","tree":{"name":"name","tree":"example"},"update":false}]',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  )
})

test('fires a PUT when update is true', () => {
  const update = true
  const snapshots = [{ name, tree: { name, tree: example }, update }]
  runTests(snapshots)

  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:3000/snapguidist',
    {
      body: '[{"name":"name","tree":{"name":"name","tree":"example"},"update":true}]',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  )
})
