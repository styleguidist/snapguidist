const { SnapshotState } = require('jest-snapshot')
const stripAnsi = require('strip-ansi')
const diff = require('jest-diff')
const path = require('path')

const base = './.snapguidist/__snapshots__/'
const typeOf = { value: Symbol.for('react.test.json') }

// Clean up result for better looking on CodeMirror
const cleanUp = (result) => {
  result.actual = result.actual.trim()
  result.expected = (result.expected || '').trim()
  result.diff = (result.diff || '').replace(/\n[ ]+\n/g, '\n\n').trim()
}

const setTreeTypes = (obj) => {
  if (!obj) return

  if (Array.isArray(obj)) {
    obj.forEach(setTreeTypes)
  } else if (obj.type) {
    setTreeTypes(obj.children)
    Object.defineProperty(obj, '$$typeof', typeOf)
  }
}

const snapshot = (name, tree, update) => {
  const snapshotPath = path.resolve(base, `${name}.snap`)
  const state = new SnapshotState(null, {
    snapshotPath,
    updateSnapshot: update ? 'all' : 'new',
  })

  setTreeTypes(tree)

  const result = state.match({
    testName: name,
    received: tree,
  })

  state.save()

  if (!result.pass) {
    result.diff = stripAnsi(diff(result.expected, result.actual))
    cleanUp(result)
  }

  return result
}

module.exports = snapshot
