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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, password, emailAddress, userType) {
    var user, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ParseWrapperService2.default.createNewUser({
              username: username,
              password: password,
              emailAddress: emailAddress,
              userType: userType
            });
            _context.next = 3;
            return user.signUp();

          case 3:
            result = _context.sent;
            return _context.abrupt('return', (0, _immutable.Map)({
              id: result.id,
              username: result.getUsername(),
              emailAddress: result.getEmail(),
              emailAddressVerified: result.get('emailVerified'),
              userType: result.get('userType')
            }));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4) {
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
              emailAddressVerified: result.get('emailVerified'),
              userType: result.get('userType')
            }));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x5, _x6) {
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

  return function (_x7) {
    return _ref4.apply(this, arguments);
  };
}();

UserService.updateUserDetails = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        username = _ref6.username,
        password = _ref6.password,
        emailAddress = _ref6.emailAddress,
        userType = _ref6.userType;

    var user = arguments[1];
    var sessionToken = arguments[2];
    var finalUser;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = user;

            if (_context5.t0) {
              _context5.next = 5;
              break;
            }

            _context5.next = 4;
            return _ParseWrapperService2.default.getCurrentUserAsync();

          case 4:
            _context5.t0 = _context5.sent;

          case 5:
            finalUser = _context5.t0;


            if (username) {
              finalUser.setUsername(username);
            }

            if (password) {
              finalUser.setPassword(password);
            }

            if (emailAddress) {
              finalUser.setEmail(emailAddress);
            }

            if (userType) {
              finalUser.set('userType', userType);
            }

            return _context5.abrupt('return', finalUser.save(null, { sessionToken: sessionToken }));

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function () {
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

          if (!user) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt('return', (0, _immutable.Map)({
            id: user.id,
            username: user.getUsername(),
            emailAddress: user.getEmail(),
            emailAddressVerified: user.get('emailVerified'),
            userType: user.get('userType')
          }));

        case 5:
          return _context6.abrupt('return', undefined);

        case 6:
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
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(sessionToken) {
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

  return function (_x9) {
    return _ref9.apply(this, arguments);
  };
}();

UserService.getUserById = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id, sessionToken) {
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

  return function (_x10, _x11) {
    return _ref10.apply(this, arguments);
  };
}();

UserService.getUser = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(username, sessionToken) {
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

  return function (_x12, _x13) {
    return _ref11.apply(this, arguments);
  };
}();

UserService.getUserInfo = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(username, sessionToken) {
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
              username: result.getUsername(),
              emailAddress: result.getEmail(),
              userType: result.get('userType'),
              providerEmail: result.get('providerEmail')
            }));

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function (_x14, _x15) {
    return _ref12.apply(this, arguments);
  };
}();

UserService.getUserInfoById = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(id, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return UserService.getUserById(id, sessionToken);

          case 2:
            result = _context12.sent;
            return _context12.abrupt('return', (0, _immutable.Map)({
              id: result.id,
              username: result.getUsername(),
              emailAddress: result.getEmail(),
              userType: result.get('userType'),
              providerEmail: result.get('providerEmail')
            }));

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function (_x16, _x17) {
    return _ref13.apply(this, arguments);
  };
}();

exports.default = UserService;