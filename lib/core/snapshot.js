'use strict';

var _require = require('jest-snapshot'),
    SnapshotState = _require.SnapshotState;

var stripAnsi = require('strip-ansi');
var diff = require('jest-diff');
var path = require('path');

var base = './.snapguidist/__snapshots__/';
var typeOf = { value: Symbol.for('react.test.json')

  // Clean up result for better looking on CodeMirror
  /*
   * const cleanUp = (result) => {
   *   result.actual = result.actual.trim()
   *   result.expected = result.expected.trim()
   *   result.diff = result.diff.replace(/\n[ ]+\n/g, '\n\n')
   * }
   */

};var snapshot = function snapshot(name, tree) {
  var updateSnapshot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'new';

  var snapshotPath = path.resolve(base, name + '.snap');
  var state = new SnapshotState(null, { updateSnapshot: updateSnapshot, snapshotPath: snapshotPath });

  Object.defineProperty(tree, '$$typeof', typeOf);

  var result = state.match(name, tree);
  state.save(updateSnapshot);

  if (!result.pass) {
    result.diff = stripAnsi(diff(result.expected, result.actual));
    // cleanUp(result)
  }

  return result;
};

module.exports = snapshot;