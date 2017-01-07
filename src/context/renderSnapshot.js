import renderer from 'react-test-renderer'

export default function renderSnapshot(name, reactElement) {
  const tree = renderer.create(reactElement).toJSON()
  return JSON.stringify({ name, tree })
}

