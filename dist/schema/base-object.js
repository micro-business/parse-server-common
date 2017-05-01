'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseObject = undefined;

var _platform = require('../platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parse = void 0;

if (_platform2.default === 'node') {
  Parse = require('parse/node'); // eslint-disable-line global-require
} else if (_platform2.default === 'browser') {
  Parse = require('parse'); // eslint-disable-line global-require
} else {
  Parse = require('parse/react-native'); // eslint-disable-line global-require
}

var BaseObject = function (_Parse$Object) {
  _inherits(BaseObject, _Parse$Object);

  function BaseObject(object, className) {
    _classCallCheck(this, BaseObject);

    var _this = _possibleConstructorReturn(this, (BaseObject.__proto__ || Object.getPrototypeOf(BaseObject)).call(this, className));

    _this.getObject = function () {
      return _this.object || _this;
    };

    _this.saveObject = function () {
      return _this.getObject().save();
    };

    _this.getId = function () {
      return _this.getObject().id;
    };

    _this.object = object;
    return _this;
  }

  return BaseObject;
}(Parse.Object);

exports.BaseObject = BaseObject;
exports.default = BaseObject;