import renderer from 'react-test-renderer'

const headers = { 'Content-Type': 'application/json' }

export default function runTest(name, example, update) {
  const {
    host = 'localhost',
    port = 3000,
  } = process.env.SNAPGUIDIST

  const url = `http://${host}:${port}/snapguidist`
  const method = update ? 'PUT' : 'POST'
  const tree = renderer.create(example).toJSON()
  const body = JSON.stringify({ name, tree })

  return fetch(url, { method, headers, body })
    .then(response => response.json())
    .catch((e) => {
      console.warn('Ouch, is the Snapguidist server up?') // eslint-disable-line
      throw e
    })
}

