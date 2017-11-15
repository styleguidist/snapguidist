'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Code = require('./Code');

var _Code2 = _interopRequireDefault(_Code);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_Component) {
  _inherits(Test, _Component);

  function Test(props) {
    _classCallCheck(this, Test);

    var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

    _this.state = { expanded: false };

    _this.handleClick = _this.handleClick.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  _createClass(Test, [{
    key: 'handleClick',
    value: function handleClick() {
      if (this.state.expanded) {
        this.toggle();
      }

      this.props.onClick();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: 'isPass',
    value: function isPass() {
      return this.props.response && this.props.response.pass;
    }
  }, {
    key: 'isFail',
    value: function isFail() {
      return this.props.response && !this.props.response.pass;
    }
  }, {
    key: 'render',
    value: function render() {
      var containerClasses = (0, _classnames2.default)('snapguidist__test', { 'snapguidist__test--pass': this.isPass() }, { 'snapguidist__test--fail': this.isFail() }, { 'snapguidist__test--expanded': this.state.expanded });

      var arrowClasses = (0, _classnames2.default)('snapguidist__arrow', { 'snapguidist__arrow--expanded': this.state.expanded });

      return _react2.default.createElement(
        'div',
        { className: containerClasses },
        this.isFail() && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'button',
              {
                className: 'snapguidist__button',
                disabled: this.props.isFetching,
                onClick: this.handleClick
              },
              'Update'
            ),
            _react2.default.createElement(
              'button',
              {
                className: 'snapguidist__button',
                disabled: this.props.isFetching,
                onClick: this.toggle
              },
              _react2.default.createElement(
                'span',
                { className: arrowClasses },
                '\u25BC'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            this.props.response.diff ? _react2.default.createElement(_Code2.default, { diff: true, label: 'Difference', value: this.props.response.diff }) : _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Code2.default, { label: 'Actual', value: this.props.response.actual }),
              _react2.default.createElement(_Code2.default, { label: 'Expected', value: this.props.response.expected })
            )
          )
        )
      );
    }
  }]);

  return Test;
}(_react.Component);

Test.propTypes = {
  isFetching: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  response: _propTypes2.default.shape({
    actual: _propTypes2.default.string,
    count: _propTypes2.default.number,
    diff: _propTypes2.default.string,
    expected: _propTypes2.default.string,
    pass: _propTypes2.default.bool
  })
};

Test.defaultProps = {
  isFetching: false,
  onClick: function onClick() {},
  response: null
};

exports.default = Test;