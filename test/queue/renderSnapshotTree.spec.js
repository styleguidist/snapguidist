import renderSnapShotTree from '../../src/queue/renderSnapshotTree'

jest.mock(
  'react-test-renderer',
  () => ({ create: reactElement => ({ toJSON: () => reactElement }) })
)

test('returns a JSON with a valid structure', () => {
  const snapshot = '"reactElement"'
  expect(renderSnapShotTree('reactElement')).toEqual(snapshot)
})
