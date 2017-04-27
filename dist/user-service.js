'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parseWrapperService = require('./parse-wrapper-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: 'signUpWithEmailAndPassword',
    value: function signUpWithEmailAndPassword(emailAddress, password) {
      var user = _parseWrapperService.ParseWrapperService.createNewUser();

      user.set('username', emailAddress);
      user.set('password', password);
      user.set('email', emailAddress);

      return user.signUp();
    }
  }, {
    key: 'signInWithEmailAndPassword',
    value: function signInWithEmailAndPassword(emailAddress, password) {
      return _parseWrapperService.ParseWrapperService.logIn(emailAddress, password);
    }
  }, {
    key: 'signOut',
    value: function signOut() {
      return _parseWrapperService.ParseWrapperService.logOut();
    }
  }, {
    key: 'sendEmailVerification',
    value: function sendEmailVerification() {
      var user = _parseWrapperService.ParseWrapperService.getCurrentUser();

      // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
      user.set('email', user.getEmail());

      return user.save();
    }
  }, {
    key: 'resetPassword',
    value: function resetPassword(emailAddress) {
      return _parseWrapperService.ParseWrapperService.getCurrentUser().requestPasswordReset(emailAddress);
    }
  }, {
    key: 'updatePassword',
    value: function updatePassword(newPassword) {
      var user = _parseWrapperService.ParseWrapperService.getCurrentUser();

      user.set('password', newPassword);

      return user.save();
    }
  }]);

  return UserService;
}();

exports.UserService = UserService;
exports.default = UserService;