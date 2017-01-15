import '../helpers/console'

const headers = { 'Content-Type': 'application/json' }

export default function runTest(snapshot, update) {
  const {
    serverHost,
    serverPort,
  } = process.env.SNAPGUIDIST

  const url = `http://${serverHost}:${serverPort}/snapguidist`
  const method = update ? 'PUT' : 'POST'

  return fetch(url, { method, headers, body: snapshot })
    .then(response => response.json())
    .catch((e) => {
      console.warn('Ouch, is the Snapguidist server up?') // eslint-disable-line
      throw e
    })
}

