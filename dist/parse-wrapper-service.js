'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParseWrapperService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _detectNode = require('detect-node');

var _detectNode2 = _interopRequireDefault(_detectNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parse = void 0;

if (_detectNode2.default) {
  Parse = require('parse/node'); // eslint-disable-line global-require
} else if (typeof window !== 'undefined') {
  Parse = require('parse'); // eslint-disable-line global-require
} else {
  Parse = require('parse/react-native'); // eslint-disable-line global-require
}

var ParseWrapperService = function () {
  function ParseWrapperService() {
    _classCallCheck(this, ParseWrapperService);
  }

  _createClass(ParseWrapperService, null, [{
    key: 'createQuery',
    value: function createQuery(object) {
      return new Parse.Query(object);
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return Parse.Config.get();
    }
  }, {
    key: 'getCachedConfig',
    value: function getCachedConfig() {
      return Parse.Config.current();
    }
  }]);

  return ParseWrapperService;
}();

exports.ParseWrapperService = ParseWrapperService;
exports.default = ParseWrapperService;