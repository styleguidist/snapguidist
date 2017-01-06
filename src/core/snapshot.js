const { SnapshotState } = require('jest-snapshot')
const stripAnsi = require('strip-ansi')
const diff = require('jest-diff')
const path = require('path')

const base = './.snapguidist/__snapshots__/'
const typeOf = { value: Symbol.for('react.test.json') }

// Clean up result for better looking on CodeMirror
const cleanUp = (result) => {
  result.actual = result.actual.trim()
  result.expected = result.expected.trim()
  result.diff = result.diff.replace(/\n[ ]+\n/g, '\n\n')
}

const snapshot = (name, tree, update) => {
  const destination = path.resolve(base, `${name}.snap`)
  const state = new SnapshotState(null, update, destination)

  Object.defineProperty(tree, '$$typeof', typeOf)

  const result = state.match(name, tree)
  state.save(update)

  if (!result.pass) {
    result.diff = stripAnsi(diff(result.expected, result.actual))
    cleanUp(result)
  }

  return result
}

module.exports = snapshot
