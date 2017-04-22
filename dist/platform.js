'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _detectNode = require('detect-node');

var _detectNode2 = _interopRequireDefault(_detectNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNative = false;
var platformType = void 0;
var Platform = void 0;

if (_detectNode2.default) {
  platformType = 'node';
} else {
  try {
    Platform = require('react-native').Platform;
    isNative = true;
  } catch (e) {}

  if (isNative) {
    platformType = 'react-native';
  } else {
    platformType = 'browser';
  }
}

exports.default = platformType;