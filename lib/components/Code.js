'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCodemirror = require('react-codemirror2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('codemirror/mode/diff/diff');
require('codemirror/mode/jsx/jsx');

var Code = function Code(props, context) {
  var options = {
    mode: props.diff ? 'diff' : 'jsx',
    theme: context.config.highlightTheme
  };

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'snapguidist__label' },
      props.label
    ),
    _react2.default.createElement(
      'div',
      { className: 'snapguidist__code' },
      _react2.default.createElement(_reactCodemirror.UnControlled, { value: props.value, options: options })
    )
  );
};

Code.propTypes = {
  diff: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  value: _propTypes2.default.string
};

Code.defaultProps = {
  diff: false,
  label: '',
  value: ''
};

Code.contextTypes = {
  config: _propTypes2.default.object.isRequired
};

exports.default = Code;