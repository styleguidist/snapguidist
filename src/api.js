import fetch from 'unfetch'
import renderer from 'react-test-renderer'

const api = {

  runTest(name, example, update) {
    const {
      host = 'localhost',
      port = 3000,
    } = process.env.SNAPGUIDIST

    return fetch(`http://${host}:${port}/snapguidist`, {
      method: update ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        tree: renderer.create(example).toJSON(),
      }),
    })
    .then(response => response.json())
    .catch(() => console.warn('Ouch, is the Snapguidist server up?')) // eslint-disable-line
  },

}

export default api
