'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var UserException = function UserException(errorMessage) {
  var _this = this;

  _classCallCheck(this, UserException);

  this.getErrorMessage = function() {
    return _this.errorMessage;
  };

  this.errorMessage = errorMessage;
};

exports.default = UserException;
