import { snapguidistFactory, snapguidistShape } from '../../src/queue/index'

jest.mock(
  '../../src/queue/snapguidistFactory',
  () => () => ({})
)

jest.mock(
  '../../src/queue/snapguidistShape',
  () => ({})
)

test('it exposes the expected API', () => {
  expect(snapguidistFactory).toBeDefined()
  expect(typeof snapguidistFactory).toBe('function')
  expect(snapguidistShape).toBeDefined()
  expect(snapguidistShape).toMatchObject({})
})
