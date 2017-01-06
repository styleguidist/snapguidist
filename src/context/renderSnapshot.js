import renderer from 'react-test-renderer'

export default function renderSnapshot(name, component) {
  const tree = renderer.create(component).toJSON()
  return JSON.stringify({ name, tree })
}

