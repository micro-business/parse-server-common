'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonJavascript = require('@microbusiness/common-javascript');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createConfigLoaderByKey = function createConfigLoaderByKey() {
  return new _dataloader2.default(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(keys) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', Promise.all(keys.map(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
                  var configs, config;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _services.ParseWrapperService.getConfig();

                        case 2:
                          configs = _context.sent;
                          config = configs.get(key);

                          if (!_commonJavascript.Common.isNotUndefined(config)) {
                            _context.next = 6;
                            break;
                          }

                          return _context.abrupt('return', _immutable2.default.fromJS(config));

                        case 6:
                          throw new Error('Failed to retrieve configuration for key: ' + key);

                        case 7:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }())));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = createConfigLoaderByKey;