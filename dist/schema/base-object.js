'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _this.object = object;

    _this.getObject = _this.getObject.bind(_this);
    _this.saveObject = _this.saveObject.bind(_this);
    _this.getId = _this.getId.bind(_this);
    return _this;
  }

  _createClass(BaseObject, [{
    key: 'getObject',
    value: function getObject() {
      return this.object || this;
    }
  }, {
    key: 'saveObject',
    value: function saveObject() {
      return this.getObject().save();
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this.getObject().id;
    }
  }]);

  return BaseObject;
}(Parse.Object);

exports.BaseObject = BaseObject;
exports.default = BaseObject;