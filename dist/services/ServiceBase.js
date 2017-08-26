'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessCommonJavascript = require('micro-business-common-javascript');

var _ParseWrapperService = require('./ParseWrapperService');

var _ParseWrapperService2 = _interopRequireDefault(_ParseWrapperService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceBase = function ServiceBase(ObjectType, buildSearchQueryFunc, buildIncludeQueryFunc, objectFriendlyName) {
  var _this = this;

  _classCallCheck(this, ServiceBase);

  this.create = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(info, acl, sessionToken) {
      var object, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              object = _this.ObjectType.spawn(info);


              ServiceBase.setACL(object, acl);

              _context.next = 4;
              return object.save(null, { sessionToken: sessionToken });

            case 4:
              result = _context.sent;
              return _context.abrupt('return', result.id);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  this.read = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, criteria, sessionToken) {
      var query, finalQuery, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = _ParseWrapperService2.default.createQuery(_this.ObjectType).equalTo('objectId', id);
              finalQuery = _this.buildIncludeQueryFunc ? _this.buildIncludeQueryFunc(query, criteria) : query;
              _context2.next = 4;
              return finalQuery.first({ sessionToken: sessionToken });

            case 4:
              result = _context2.sent;

              if (!result) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', new _this.ObjectType(result).getInfo());

            case 7:
              throw new _microBusinessCommonJavascript.Exception(_this.messagePrefix + id);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.update = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(info, sessionToken) {
      var result, object;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _ParseWrapperService2.default.createQuery(_this.ObjectType).equalTo('objectId', info.get('id')).first({ sessionToken: sessionToken });

            case 2:
              result = _context3.sent;

              if (!result) {
                _context3.next = 8;
                break;
              }

              object = new _this.ObjectType(result);
              _context3.next = 7;
              return object.updateInfo(info).saveObject(sessionToken);

            case 7:
              return _context3.abrupt('return', object.getId());

            case 8:
              throw new _microBusinessCommonJavascript.Exception(_this.messagePrefix + info.get('id'));

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.delete = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, sessionToken) {
      var result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _ParseWrapperService2.default.createQuery(_this.ObjectType).equalTo('objectId', id).first({ sessionToken: sessionToken });

            case 2:
              result = _context4.sent;

              if (result) {
                _context4.next = 5;
                break;
              }

              throw new _microBusinessCommonJavascript.Exception(_this.messagePrefix + id);

            case 5:
              _context4.next = 7;
              return result.destroy({ sessionToken: sessionToken });

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x9, _x10) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.search = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
      var results;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.buildSearchQueryFunc(criteria).find({ sessionToken: sessionToken });

            case 2:
              results = _context5.sent;
              return _context5.abrupt('return', _immutable2.default.fromJS(results).map(function (result) {
                return new _this.ObjectType(result).getInfo();
              }));

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x11, _x12) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.searchAll = function (criteria, sessionToken) {
    var event = new _microBusinessCommonJavascript.NewSearchResultReceivedEvent();
    var promise = _this.buildSearchQueryFunc(criteria).each(function (result) {
      return event.raise(new _this.ObjectType(result).getInfo());
    }, { sessionToken: sessionToken });

    return {
      event: event,
      promise: promise
    };
  };

  this.count = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', _this.buildSearchQueryFunc(criteria).count({ sessionToken: sessionToken }));

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x13, _x14) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.exists = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _this.count(criteria, sessionToken);

            case 2:
              _context7.t0 = _context7.sent;
              return _context7.abrupt('return', _context7.t0 > 0);

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function (_x15, _x16) {
      return _ref7.apply(this, arguments);
    };
  }();

  this.addLinkQuery = function (conditions, query, conditionPropKey, columnName) {
    if (ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (conditions.has(conditionPropKey + 'Id')) {
      var value = conditions.get(conditionPropKey + 'Id');

      if (value) {
        query.equalTo(columnName, _this.ObjectType.createWithoutData(value));

        return true;
      }
    }

    if (conditions.has(conditionPropKey + 's')) {
      var _value = conditions.get(conditionPropKey + 's');

      if (_value && !_value.isEmpty()) {
        query.containedIn(columnName, _value);

        return true;
      }
    }

    if (conditions.has(conditionPropKey + 'Ids')) {
      var _value2 = conditions.get(conditionPropKey + 'Ids');

      if (_value2 && !_value2.isEmpty()) {
        query.containedIn(columnName, _value2.map(function (id) {
          return _this.ObjectType.createWithoutData(id);
        }).toArray());

        return true;
      }
    }

    return false;
  };

  this.ObjectType = ObjectType;
  this.buildSearchQueryFunc = buildSearchQueryFunc;
  this.buildIncludeQueryFunc = buildIncludeQueryFunc;
  this.messagePrefix = 'No ' + objectFriendlyName + ' found with Id: ';
};

ServiceBase.setACL = function (object, acl) {
  if (acl) {
    object.setACL(acl);
  }
};

ServiceBase.addStringQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has(conditionPropKey)) {
    var value = conditions.get(conditionPropKey);

    if (value) {
      query.matches(columnName, new RegExp('^' + value + '$', 'i'));

      return true;
    }
  }

  if (conditions.has('startsWith_' + conditionPropKey)) {
    var _value3 = conditions.get('startsWith_' + conditionPropKey);

    if (_value3) {
      query.matches(columnName, new RegExp('^' + _value3, 'i'));

      return true;
    }
  }

  if (conditions.has('endsWith_' + conditionPropKey)) {
    var _value4 = conditions.get('endsWith_' + conditionPropKey);

    if (_value4) {
      query.matches(columnName, new RegExp(_value4 + '$', 'i'));

      return true;
    }
  }

  if (conditions.has('contains_' + conditionPropKey)) {
    var _value5 = conditions.get('contains_' + conditionPropKey);

    if (_value5) {
      query.matches(columnName, new RegExp('(?=.*' + _value5 + ')', 'i'));

      return true;
    }
  }

  if (conditions.has('contains_' + conditionPropKey + 's')) {
    var values = conditions.get('contains_' + conditionPropKey + 's');

    if (values && !values.isEmpty()) {
      query.matches(columnName, new RegExp(values.map(function (value) {
        return '(?=.*' + value + ')';
      }).reduce(function (reduction, value) {
        return reduction + value;
      })), 'i');

      return true;
    }
  }

  return false;
};

ServiceBase.addGeoLocationQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('near_' + conditionPropKey)) {
    var value = conditions.get('near_' + conditionPropKey);

    if (value) {
      query.near(columnName, value);

      return true;
    }
  }

  if (conditions.has('withinGeoBox_' + conditionPropKey)) {
    var _value6 = conditions.get('withinGeoBox_' + conditionPropKey);

    if (_value6) {
      query.withinGeoBox(columnName, _value6.get('southwest'), _value6.get('northeast'));

      return true;
    }
  }

  if (conditions.has('withinMiles_' + conditionPropKey)) {
    var _value7 = conditions.get('withinMiles_' + conditionPropKey);

    if (_value7) {
      query.withinMiles(columnName, _value7.get('point'), _value7.get('distance'));

      return true;
    }
  }

  if (conditions.has('withinKilometers_' + conditionPropKey)) {
    var _value8 = conditions.get('withinKilometers_' + conditionPropKey);

    if (_value8) {
      query.withinKilometers(columnName, _value8.get('point'), _value8.get('distance'));

      return true;
    }
  }

  if (conditions.has('withinRadians_' + conditionPropKey)) {
    var _value9 = conditions.get('withinRadians_' + conditionPropKey);

    if (_value9) {
      query.withinRadians(columnName, _value9.get('point'), _value9.get('distance'));

      return true;
    }
  }

  return false;
};

ServiceBase.addDateTimeQuery = function (conditions, query, conditionPropKey, columnName) {
  return ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);
};

ServiceBase.addNumberQuery = function (conditions, query, conditionPropKey, columnName) {
  return ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);
};

ServiceBase.addUserLinkQuery = function (conditions, query, conditionPropKey, columnName) {
  if (ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName)) {
    return true;
  }

  if (conditions.has(conditionPropKey + 'Id')) {
    var value = conditions.get(conditionPropKey + 'Id');

    if (value) {
      query.equalTo(columnName, _ParseWrapperService2.default.createUserWithoutData(value));

      return true;
    }
  }

  if (conditions.has(conditionPropKey + 's')) {
    var _value10 = conditions.get(conditionPropKey + 's');

    if (_value10 && !_value10.isEmpty()) {
      query.containedIn(columnName, _value10);

      return true;
    }
  }

  if (conditions.has(conditionPropKey + 'Ids')) {
    var _value11 = conditions.get(conditionPropKey + 'Ids');

    if (_value11 && !_value11.isEmpty()) {
      query.containedIn(columnName, _value11.map(function (id) {
        return _ParseWrapperService2.default.createUserWithoutData(id);
      }).toArray());

      return true;
    }
  }

  return false;
};

ServiceBase.addEqualityQuery = function (conditions, query, conditionPropKey, columnName) {
  if (ServiceBase.addEqualToQuery(conditions, query, conditionPropKey, columnName)) {
    return true;
  }

  if (ServiceBase.addNotEqualToQuery(conditions, query, conditionPropKey, columnName)) {
    return true;
  }

  if (ServiceBase.addLessThanToQuery(conditions, query, conditionPropKey, columnName)) {
    return true;
  }

  if (ServiceBase.addLessThanOrEqualToQuery(conditions, query, conditionPropKey, columnName)) {
    return true;
  }

  if (ServiceBase.addGreaterThanToQuery(conditions, query, conditionPropKey, columnName)) {
    return true;
  }

  if (ServiceBase.addGreaterThanOrEqualToQuery(conditions, query, conditionPropKey, columnName)) {
    return true;
  }

  return false;
};

ServiceBase.addEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has(conditionPropKey)) {
    var value = conditions.get(conditionPropKey);

    if (value) {
      query.equalTo(columnName, value);

      return true;
    }
  }

  return false;
};

ServiceBase.addNotEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('notEqual_' + conditionPropKey)) {
    var value = conditions.get('notEqual_' + conditionPropKey);

    if (value) {
      query.notEqualTo(columnName, value);

      return true;
    }
  }

  return false;
};

ServiceBase.addLessThanToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('lessThan_' + conditionPropKey)) {
    var value = conditions.get('lessThan_' + conditionPropKey);

    if (value) {
      query.lessThan(columnName, value);

      return true;
    }
  }

  return false;
};

ServiceBase.addLessThanOrEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('lessThanOrEqualTo_' + conditionPropKey)) {
    var value = conditions.get('lessThanOrEqualTo_' + conditionPropKey);

    if (value) {
      query.lessThanOrEqualTo(columnName, value);

      return true;
    }
  }

  return false;
};

ServiceBase.addGreaterThanToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('greaterThan_' + conditionPropKey)) {
    var value = conditions.get('greaterThan_' + conditionPropKey);

    if (value) {
      query.greaterThan(columnName, value);

      return true;
    }
  }

  return false;
};

ServiceBase.addGreaterThanOrEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('greaterThanOrEqualTo_' + conditionPropKey)) {
    var value = conditions.get('greaterThanOrEqualTo_' + conditionPropKey);

    if (value) {
      query.greaterThanOrEqualTo(columnName, value);

      return true;
    }
  }

  return false;
};

ServiceBase.addIncludeQuery = function (criteria, query, columnName) {
  if (criteria.has('include_' + columnName)) {
    var value = criteria.get('include_' + columnName);

    if (value) {
      query.include(columnName);

      return true;
    }
  }

  return false;
};

exports.default = ServiceBase;