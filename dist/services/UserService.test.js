'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../bootstrap');

var _UserService = require('./UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('signUpWithUsernameAndPassword', function () {
  test('should return the new signed up user', function (done) {
    var username = (0, _v2.default)();
    var emailAddress = (0, _v2.default)() + '@email.com';

    _UserService2.default.signUpWithUsernameAndPassword(username, (0, _v2.default)(), emailAddress).then(function (result) {
      expect(result.get('id')).toBeTruthy();
      expect(result.get('username')).toBe(username);
      expect(result.get('emailAddress')).toBe(emailAddress);
      expect(result.get('emailVerified')).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('signInWithUsernameAndPassword', function () {
  test('should fail if email address does not exist', function (done) {
    var username = (0, _v2.default)();

    _UserService2.default.signInWithUsernameAndPassword(username, (0, _v2.default)()).then(function () {
      fail('User signed in for email that does not exist. Email: ' + username);
      done();
    }).catch(function () {
      return done();
    });
  });

  test('should fail if password is wrong', function (done) {
    var username = (0, _v2.default)();

    _UserService2.default.signUpWithUsernameAndPassword(username, (0, _v2.default)(), (0, _v2.default)() + '@email.com').then(function () {
      return _UserService2.default.signInWithUsernameAndPassword(username, (0, _v2.default)());
    }).then(function () {
      fail('User signed in for incorrect password.');
      done();
    }).catch(function () {
      return done();
    });
  });

  test('should return the signed in user', function (done) {
    var username = (0, _v2.default)();
    var emailAddress = (0, _v2.default)() + '@email.com';
    var password = (0, _v2.default)();

    _UserService2.default.signUpWithUsernameAndPassword(username, password, emailAddress).then(function () {
      return _UserService2.default.signInWithUsernameAndPassword(username, password);
    }).then(function (result) {
      expect(result.get('id')).toBeTruthy();
      expect(result.get('username')).toBe(username);
      expect(result.get('emailAddress')).toBe(emailAddress);
      expect(result.get('emailVerified')).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('getUserInfo', function () {
  test('should reject if username does not exist', function (done) {
    var username = (0, _v2.default)();

    _UserService2.default.getUserInfo(username).then(function () {
      fail('Received user info for use that does not exist. Username: ' + username);
      done();
    }).catch(function (error) {
      expect(error).toBe('No user found with username: ' + username);
      done();
    });
  });

  test('should return the user info', function (done) {
    var username = (0, _v2.default)();

    _UserService2.default.signUpWithUsernameAndPassword(username, (0, _v2.default)(), (0, _v2.default)() + '@email.com').then(function () {
      return _UserService2.default.getUserInfo(username);
    }).then(function (result) {
      expect(result.get('id')).toBeTruthy();
      expect(result.get('username')).toBe(username);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});