import renderSnapShot from '../../src/context/renderSnapshot'

jest.mock(
  'react-test-renderer',
  () => ({ create: reactElement => ({ toJSON: () => reactElement }) })
)

test('should return a JSON with a valid structure', () => {
  const snapshot = '{"name":"name","tree":"reactElement"}'
  expect(renderSnapShot('name', 'reactElement')).toEqual(snapshot)
})
