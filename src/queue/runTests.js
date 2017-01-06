import '../helpers/console'

const headers = { 'Content-Type': 'application/json' }
const method = 'POST'

export default function runTests(tests) {
  const {
    serverHost,
    serverPort,
  } = process.env.SNAPGUIDIST

  const url = `http://${serverHost}:${serverPort}/snapguidist`

  const body = JSON.stringify(tests)
  return fetch(url, { method, headers, body })
    .then(response => response.json())
    .catch((e) => {
      console.warn('Ouch, is the Snapguidist server up?') // eslint-disable-line
      throw e
    })
}

