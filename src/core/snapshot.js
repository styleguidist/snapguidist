const { SnapshotState } = require('jest-snapshot')
const path = require('path')

const base = './.snapguidist/__snapshots__/'
const typeOf = { value: Symbol.for('react.test.json') }

const snapshot = (name, tree, update) => {
  const destination = path.resolve(base, `${name}.snap`)
  const state = new SnapshotState(null, update, destination)

  Object.defineProperty(tree, '$$typeof', typeOf)

  const result = state.match(name, tree)
  state.save(update)

  return result
}

module.exports = snapshot
