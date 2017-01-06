const headers = { 'Content-Type': 'application/json' }

export default function runTest(snapshot, update) {
  const {
    host = 'localhost',
    port = 3000,
  } = process.env.SNAPGUIDIST

  const url = `http://${host}:${port}/snapguidist`
  const method = update ? 'PUT' : 'POST'

  return fetch(url, { method, headers, body: snapshot })
    .then(response => response.json())
    .catch((e) => {
      console.warn('Ouch, is the Snapguidist server up?') // eslint-disable-line
      throw e
    })
}

