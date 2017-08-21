'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('signUpWithUsernameAndPassword', function () {
  test('should return the new signed up user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var username, emailAddress, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = (0, _v2.default)();
            emailAddress = (0, _v2.default)() + '@email.com';
            _context.next = 4;
            return _.UserService.signUpWithUsernameAndPassword(username, (0, _v2.default)(), emailAddress);

          case 4:
            result = _context.sent;


            expect(result.get('id')).toBeTruthy();
            expect(result.get('username')).toBe(username);
            expect(result.get('emailAddress')).toBe(emailAddress);
            expect(result.get('emailVerified')).toBeFalsy();

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});

describe('signInWithUsernameAndPassword', function () {
  test('should fail if email address does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var username;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            username = (0, _v2.default)();
            _context2.next = 4;
            return _.UserService.signInWithUsernameAndPassword(username, (0, _v2.default)());

          case 4:
            fail('User signed in for email that does not exist. Email: ' + username);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            expect(_context2.t0).toBeTruthy();

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  })));

  test('should fail if password is wrong', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var username;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            username = (0, _v2.default)();
            _context3.next = 4;
            return _.UserService.signUpWithUsernameAndPassword(username, (0, _v2.default)(), (0, _v2.default)() + '@email.com');

          case 4:
            _context3.next = 6;
            return _.UserService.signInWithUsernameAndPassword(username, (0, _v2.default)());

          case 6:
            fail('User signed in for incorrect password.');
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](0);

            expect(_context3.t0).toBeTruthy();

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 9]]);
  })));

  test('should return the signed in user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var username, emailAddress, password, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            username = (0, _v2.default)();
            emailAddress = (0, _v2.default)() + '@email.com';
            password = (0, _v2.default)();
            _context4.next = 5;
            return _.UserService.signUpWithUsernameAndPassword(username, password, emailAddress);

          case 5:
            _context4.next = 7;
            return _.UserService.signInWithUsernameAndPassword(username, password);

          case 7:
            result = _context4.sent;


            expect(result.get('id')).toBeTruthy();
            expect(result.get('username')).toBe(username);
            expect(result.get('emailAddress')).toBe(emailAddress);
            expect(result.get('emailVerified')).toBeFalsy();

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('getUserInfo', function () {
  test('should reject if username does not exist', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var username;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            username = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _.UserService.getUserInfo(username);

          case 4:

            fail('Received user info for use that does not exist. Username: ' + username);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No user found with username: ' + username);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 7]]);
  })));

  test('should return the user info', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var username, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            username = (0, _v2.default)();
            _context6.next = 3;
            return _.UserService.signUpWithUsernameAndPassword(username, (0, _v2.default)(), (0, _v2.default)() + '@email.com');

          case 3:
            _context6.next = 5;
            return _.UserService.getUserInfo(username);

          case 5:
            result = _context6.sent;


            expect(result.get('id')).toBeTruthy();
            expect(result.get('username')).toBe(username);

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});