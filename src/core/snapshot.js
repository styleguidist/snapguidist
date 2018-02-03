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
  result.diff = (result.diff || '').replace(/\n[ ]+\n/g, '\n\n')
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

  const result = state.match(name, tree)

  // NOTE: result.expected can be null
  result.expected = String(result.expected)

  state.save()

  // Keep backward compatible; remove extra props added to passing result
  // in newest jest-snapshot pkg
  if (result.pass) {
    delete result.actual
    delete result.expected
    delete result.count
  } else {
    result.diff = stripAnsi(diff(result.expected, result.actual))
    cleanUp(result)
  }

  return result
}

module.exports = snapshot
