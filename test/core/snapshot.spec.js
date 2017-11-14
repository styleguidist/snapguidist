import fs from 'fs-extra'
import snapshot from '../../src/core/snapshot'

beforeEach(() => {
  fs.emptyDirSync('./.snapguidist/__snapshots__')
})

afterAll(() => {
  fs.removeSync('./.snapguidist')
})

test('passes if new', () => {
  const tree = { type: 'div' }
  const result = snapshot('name', tree, 'new')

  expect(result).toEqual({
    actual: '',
    count: 1,
    expected: '',
    pass: true,
  })
})

test('fails if the type changes', () => {
  const tree = { type: 'div', children: [{ type: 'span' }] }
  snapshot('name', tree)

  tree.type = 'span'
  const result = snapshot('name', tree)

  expect(result).toMatchSnapshot()
})

test('does not fail if update is "all"', () => {
  const tree = { type: 'div' }
  snapshot('name', tree)

  tree.type = 'span'
  const update = 'all'
  const result = snapshot('name', tree, update)

  expect(result).toEqual({
    actual: '',
    count: 1,
    expected: '',
    pass: true,
  })
})
