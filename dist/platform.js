'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _detectNode = require('detect-node');

var _detectNode2 = _interopRequireDefault(_detectNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNative = false;
var Platform = void 0; // eslint-disable-line no-unused-vars
var platformType = void 0; // eslint-disable-line import/no-mutable-exports

if (_detectNode2.default) {
  platformType = 'node';
} else {
  try {
    Platform = require('react-native') // eslint-disable-line import/no-unresolved
    .Platform;
    isNative = true;
  } catch (e) {} // eslint-disable-line no-empty

  if (isNative) {
    platformType = 'react-native';
  } else {
    platformType = 'browser';
  }
}

exports.default = platformType;