import isNode from 'detect-node';

let isNative = false;
let platformType;
let Platform;

if (isNode) {
  platformType = 'node';
} else {
  try {
    Platform = require('react-native')
      .Platform;
    isNative = true;
  } catch (e) {}

  if (isNative) {
    platformType = 'react-native';
  } else {
    platformType = 'browser';
  }
}

export default platformType;
