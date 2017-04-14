'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseObject = require('./schema/base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _parseWrapperService = require('./parse-wrapper-service');

var _parseWrapperService2 = _interopRequireDefault(_parseWrapperService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  BaseObject: _baseObject2.default,
  ParseWrapperService: _parseWrapperService2.default
};