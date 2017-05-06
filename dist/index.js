'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = exports.ParseWrapperService = exports.Platform = exports.BaseObject = undefined;

var _schema = require('./schema');

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

var _parseWrapperService = require('./parse-wrapper-service');

var _parseWrapperService2 = _interopRequireDefault(_parseWrapperService);

var _userService = require('./user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BaseObject = _schema.BaseObject;
exports.Platform = _platform2.default;
exports.ParseWrapperService = _parseWrapperService2.default;
exports.UserService = _userService2.default;
exports.default = {
  BaseObject: _schema.BaseObject,
  Platform: _platform2.default,
  ParseWrapperService: _parseWrapperService2.default,
  UserService: _userService2.default
};