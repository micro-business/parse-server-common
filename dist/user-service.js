'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _parseWrapperService = require('./parse-wrapper-service');

var _parseWrapperService2 = _interopRequireDefault(_parseWrapperService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function UserService() {
  _classCallCheck(this, UserService);
};

UserService.signUpWithEmailAndPassword = function (username, password, emailAddress) {
  return new Promise(function (resolve, reject) {
    var user = _parseWrapperService2.default.createNewUser();

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
};

UserService.signInWithEmailAndPassword = function (username, password) {
  return new Promise(function (resolve, reject) {
    _parseWrapperService2.default.logIn(username, password).then(function (result) {
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
};

UserService.signOut = function () {
  return _parseWrapperService2.default.logOut();
};

UserService.sendEmailVerification = function () {
  _parseWrapperService2.default.getCurrentUserAsync().then(function (user) {
    // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
    user.setEmail(user.getEmail());

    return user.save();
  });
};

UserService.resetPassword = function (emailAddress) {
  _parseWrapperService2.default.getCurrentUserAsync().then(function (user) {
    return user.requestPasswordReset(emailAddress);
  });
};

UserService.updatePassword = function (newPassword) {
  _parseWrapperService2.default.getCurrentUserAsync().then(function (user) {
    user.setPassword(newPassword);

    return user.save();
  });
};

UserService.getCurrentUserInfo = function () {
  return new Promise(function (resolve, reject) {
    _parseWrapperService2.default.getCurrentUserAsync().then(function (user) {
      return resolve((0, _immutable.Map)({
        id: user.id,
        username: user.getUsername(),
        emailAddress: user.getEmail(),
        emailAddressVerified: user.get('emailVerified')
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

UserService.getUserInfo = function (username) {
  return new Promise(function (resolve, reject) {
    _parseWrapperService2.default.createUserQuery().equalTo('username', username).find().then(function (results) {
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
};

exports.default = UserService;