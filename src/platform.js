import isNode from 'detect-node';

let isNative = false;
let Platform; // eslint-disable-line no-unused-vars
let platformType; // eslint-disable-line import/no-mutable-exports

if (isNode) {
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

export default platformType;
