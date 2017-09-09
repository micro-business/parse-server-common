'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _ParseWrapperService = require('./ParseWrapperService');

var _ParseWrapperService2 = _interopRequireDefault(_ParseWrapperService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function UserService() {
  _classCallCheck(this, UserService);
};

UserService.signUpWithUsernameAndPassword = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, password, emailAddress) {
    var user, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ParseWrapperService2.default.createNewUser({ username: username, password: password, emailAddress: emailAddress });
            _context.next = 3;
            return user.signUp();

          case 3:
            result = _context.sent;
            return _context.abrupt('return', (0, _immutable.Map)({
              id: result.id,
              username: result.getUsername(),
              emailAddress: result.getEmail(),
              emailAddressVerified: result.get('emailVerified')
            }));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

UserService.signInWithUsernameAndPassword = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, password) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _ParseWrapperService2.default.logIn(username, password);

          case 2:
            result = _context2.sent;
            return _context2.abrupt('return', (0, _immutable.Map)({
              id: result.id,
              username: result.getUsername(),
              emailAddress: result.getEmail(),
              emailAddressVerified: result.get('emailVerified')
            }));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

UserService.signOut = function () {
  return _ParseWrapperService2.default.logOut();
};

UserService.sendEmailVerification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var user;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _ParseWrapperService2.default.getCurrentUserAsync();

        case 2:
          user = _context3.sent;


          // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
          user.setEmail(user.getEmail());

          return _context3.abrupt('return', user.save());

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
}));

UserService.resetPassword = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(emailAddress) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _ParseWrapperService2.default.getCurrentUserAsync();

          case 2:
            user = _context4.sent;
            return _context4.abrupt('return', user.requestPasswordReset(emailAddress));

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x6) {
    return _ref4.apply(this, arguments);
  };
}();

UserService.updatePassword = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(newPassword) {
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _ParseWrapperService2.default.getCurrentUserAsync();

          case 2:
            user = _context5.sent;


            user.setPassword(newPassword);

            return _context5.abrupt('return', user.save());

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x7) {
    return _ref5.apply(this, arguments);
  };
}();

UserService.getCurrentUserInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
  var user;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _ParseWrapperService2.default.getCurrentUserAsync();

        case 2:
          user = _context6.sent;
          return _context6.abrupt('return', (0, _immutable.Map)({
            id: user.id,
            username: user.getUsername(),
            emailAddress: user.getEmail(),
            emailAddressVerified: user.get('emailVerified')
          }));

        case 4:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, undefined);
}));
UserService.getCurrentUserSession = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
  var user;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _ParseWrapperService2.default.getCurrentUserAsync();

        case 2:
          user = _context7.sent;
          return _context7.abrupt('return', user ? user.getSessionToken() : null);

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, undefined);
}));

UserService.getUserForProvidedSessionToken = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _ParseWrapperService2.default.createSessionQuery().equalTo('sessionToken', sessionToken).first({ useMasterKey: true });

          case 2:
            result = _context8.sent;
            return _context8.abrupt('return', result ? result.get('user') : null);

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x8) {
    return _ref8.apply(this, arguments);
  };
}();

UserService.getUserById = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _ParseWrapperService2.default.createUserQuery().equalTo('objectId', id).first({ sessionToken: sessionToken });

          case 2:
            result = _context9.sent;

            if (!result) {
              _context9.next = 5;
              break;
            }

            return _context9.abrupt('return', result);

          case 5:
            throw new Error('No user found with id: ' + id);

          case 6:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function (_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}();

UserService.getUser = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(username, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _ParseWrapperService2.default.createUserQuery().equalTo('username', username).first({ sessionToken: sessionToken });

          case 2:
            result = _context10.sent;

            if (!result) {
              _context10.next = 5;
              break;
            }

            return _context10.abrupt('return', result);

          case 5:
            throw new Error('No user found with username: ' + username);

          case 6:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function (_x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}();

UserService.getUserInfo = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(username, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return UserService.getUser(username, sessionToken);

          case 2:
            result = _context11.sent;
            return _context11.abrupt('return', (0, _immutable.Map)({
              id: result.id,
              username: result.getUsername()
            }));

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function (_x13, _x14) {
    return _ref11.apply(this, arguments);
  };
}();

exports.default = UserService;