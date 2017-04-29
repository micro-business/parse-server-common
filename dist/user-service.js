'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _parseWrapperService = require('./parse-wrapper-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: 'signUpWithEmailAndPassword',
    value: function signUpWithEmailAndPassword(username, password, emailAddress) {
      return new Promise(function (resolve, reject) {
        var user = _parseWrapperService.ParseWrapperService.createNewUser();

        user.setUsername(username);
        user.setPassword(password);

        if (emailAddress) {
          user.setEmail(emailAddress);
        }

        user.signUp().then(function (result) {
          return resolve((0, _immutable.Map)({
            id: result.id,
            username: result.getUsername(),
            emailAddress: result.getEmail(),
            emailAddressVerified: result.get('emailVerified')
          }));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'signInWithEmailAndPassword',
    value: function signInWithEmailAndPassword(username, password) {
      return new Promise(function (resolve, reject) {
        _parseWrapperService.ParseWrapperService.logIn(username, password).then(function (result) {
          return resolve((0, _immutable.Map)({
            id: result.id,
            username: result.getUsername(),
            emailAddress: result.getEmail(),
            emailAddressVerified: result.get('emailVerified')
          }));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'signOut',
    value: function signOut() {
      return _parseWrapperService.ParseWrapperService.logOut();
    }
  }, {
    key: 'sendEmailVerification',
    value: function sendEmailVerification() {
      _parseWrapperService.ParseWrapperService.getCurrentUserAsync().then(function (user) {
        // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
        user.setEmail(user.getEmail());

        return user.save();
      });
    }
  }, {
    key: 'resetPassword',
    value: function resetPassword(emailAddress) {
      _parseWrapperService.ParseWrapperService.getCurrentUserAsync().then(function (user) {
        return user.requestPasswordReset(emailAddress);
      });
    }
  }, {
    key: 'updatePassword',
    value: function updatePassword(newPassword) {
      _parseWrapperService.ParseWrapperService.getCurrentUserAsync().then(function (user) {
        user.setPassword(newPassword);

        return user.save();
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(username) {
      return new Promise(function (resolve, reject) {
        var query = _parseWrapperService.ParseWrapperService.createUserQuery();

        query.equalTo('username', username);

        query.find().then(function (results) {
          if (results.length === 0) {
            reject('No user found with username: ' + username);
          } else if (results.length > 1) {
            reject('Multiple user found with username: ' + username);
          } else {
            resolve((0, _immutable.Map)({
              id: results[0].id,
              username: results[0].getUsername()
            }));
          }
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return UserService;
}();

exports.UserService = UserService;
exports.default = UserService;