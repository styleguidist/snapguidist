'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Preview = require('react-styleguidist/lib/rsg-components/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _Test = require('./Test');

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SnapguidistPreview = function (_Component) {
  _inherits(SnapguidistPreview, _Component);

  function SnapguidistPreview(props) {
    _classCallCheck(this, SnapguidistPreview);

    var _this = _possibleConstructorReturn(this, (SnapguidistPreview.__proto__ || Object.getPrototypeOf(SnapguidistPreview)).call(this, props));

    _this.state = { response: null };

    _this.runTest = _this.runTest.bind(_this);
    _this.evalInContext = _this.evalInContext.bind(_this);
    return _this;
  }

  _createClass(SnapguidistPreview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        return _this2.runTest();
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      if (prevProps.code !== this.props.code) {
        window.requestAnimationFrame(function () {
          return _this3.runTest();
        });
      }
    }
  }, {
    key: 'runTest',
    value: function runTest(update) {
      var _this4 = this;

      this.setState({ isFetching: true });

      _api2.default.runTest(this.context.name, this.example, update).then(function (response) {
        return _this4.setState({ response: response, isFetching: false });
      });
    }
  }, {
    key: 'evalInContext',
    value: function evalInContext(code) {
      var _this5 = this;

      var result = this.props.evalInContext(code);

      var wrapper = function wrapper(state, setState, callback) {
        _this5.example = result(state, setState, callback);

        return _this5.example;
      };

      return wrapper;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        { style: { maxWidth: '100%' } },
        _react2.default.createElement(_Preview2.default, _extends({}, this.props, { evalInContext: this.evalInContext })),
        _react2.default.createElement(_Test2.default, {
          isFetching: this.state.isFetching,
          onClick: function onClick() {
            return _this6.runTest(true);
          },
          response: this.state.response
        })
      );
    }
  }]);

  return SnapguidistPreview;
}(_react.Component);

SnapguidistPreview.propTypes = {
  code: _propTypes2.default.string.isRequired,
  evalInContext: _propTypes2.default.func.isRequired
};

SnapguidistPreview.contextTypes = {
  name: _propTypes2.default.string.isRequired
};

exports.default = SnapguidistPreview;