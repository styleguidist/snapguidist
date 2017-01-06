import renderer from 'react-test-renderer'

export default function renderSnapshotTree(reactElement) {
  const tree = renderer.create(reactElement).toJSON()
  return JSON.stringify(tree)
}

