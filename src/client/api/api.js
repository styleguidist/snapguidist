import renderer from 'react-test-renderer'

const api = {

  runTest(name, example, update) {
    return fetch('http://localhost:3001', {
      method: update ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        tree: renderer.create(example).toJSON(),
      }),
    })
    .then(response => response.json())
    .catch(() => console.warn('Ouch, is the Snapguidist server up?'))
  },

}

export default api
