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
  const result = snapshot('name', tree)

  expect(result).toEqual(expect.objectContaining({ pass: true }))
})

test('fails if the type changes', () => {
  const tree = { type: 'div', children: [{ type: 'span' }] }
  snapshot('name', tree)

  tree.type = 'span'
  const result = snapshot('name', tree)

  expect(result).toMatchSnapshot()
})

test('does not fail if update is true', () => {
  const tree = { type: 'div' }
  snapshot('name', tree)

  tree.type = 'span'
  const update = true
  const result = snapshot('name', tree, update)

  expect(result).toEqual(expect.objectContaining({ pass: true }))
})

test('passes if null, first time', () => {
  const tree = null
  const result = snapshot('name', tree)

  expect(result).toEqual(expect.objectContaining({ pass: true }))
})

test('passes if new and old are null', () => {
  const name = 'both-null'
  snapshot(name, null)
  const result = snapshot(name, null)

  expect(result).toMatchSnapshot()
})

test('fails if old was null but new is not', () => {
  const name = 'old-was-null'
  snapshot(name, null)

  const tree = { type: 'div' }
  const result = snapshot(name, tree)

  expect(result).toMatchSnapshot()
})

test('fails if new is null but old is not', () => {
  const name = 'new-is-null'
  const tree = { type: 'div' }
  snapshot(name, tree)

  const result = snapshot(name, null)

  expect(result).toMatchSnapshot()
})

test('null tree does not fail if update is true', () => {
  const name = 'null-with-update'
  const tree = { type: 'div' }
  snapshot(name, tree)

  const update = true
  const result = snapshot(name, null, update)

  expect(result).toEqual(expect.objectContaining({ pass: true }))
})
