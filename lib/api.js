'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unfetch = require('unfetch');

var _unfetch2 = _interopRequireDefault(_unfetch);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  runTest: function runTest(name, example, update) {
    var _process$env$SNAPGUID = process.env.SNAPGUIDIST,
        _process$env$SNAPGUID2 = _process$env$SNAPGUID.host,
        host = _process$env$SNAPGUID2 === undefined ? 'localhost' : _process$env$SNAPGUID2,
        _process$env$SNAPGUID3 = _process$env$SNAPGUID.port,
        port = _process$env$SNAPGUID3 === undefined ? 3000 : _process$env$SNAPGUID3;


    return (0, _unfetch2.default)('http://' + host + ':' + port + '/snapguidist', {
      method: update ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        tree: _reactTestRenderer2.default.create(example).toJSON()
      })
    }).then(function (response) {
      return response.json();
    }).catch(function () {
      return console.warn('Ouch, is the Snapguidist server up?');
    }); // eslint-disable-line
  }
};

exports.default = api;