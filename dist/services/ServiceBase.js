'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonJavascript = require('@microbusiness/common-javascript');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _extensions = require('../extensions');

var _ParseWrapperService = require('./ParseWrapperService');

var _ParseWrapperService2 = _interopRequireDefault(_ParseWrapperService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceBase = function ServiceBase(ObjectType, buildSearchQueryFunc, buildIncludeQueryFunc, objectFriendlyName) {
  _classCallCheck(this, ServiceBase);

  _initialiseProps.call(this);

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

ServiceBase.escapeTextToUseInRegex = function (str) {
  return str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
};

ServiceBase.addStringQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has(conditionPropKey)) {
    var value = conditions.get(conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      if (columnName.endsWith('LowerCase')) {
        query.matches(columnName, new RegExp('^' + ServiceBase.escapeTextToUseInRegex(value.toLowerCase()) + '$'));
      } else {
        query.matches(columnName, new RegExp('^' + ServiceBase.escapeTextToUseInRegex(value) + '$'));
      }
    }
  }

  if (conditions.has('startsWith_' + conditionPropKey)) {
    var _value = conditions.get('startsWith_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value)) {
      if (columnName.endsWith('LowerCase')) {
        query.matches(columnName, new RegExp('^' + ServiceBase.escapeTextToUseInRegex(_value.toLowerCase())));
      } else {
        query.matches(columnName, new RegExp('^' + ServiceBase.escapeTextToUseInRegex(_value)));
      }
    }
  }

  if (conditions.has('endsWith_' + conditionPropKey)) {
    var _value2 = conditions.get('endsWith_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value2)) {
      if (columnName.endsWith('LowerCase')) {
        query.matches(columnName, new RegExp(ServiceBase.escapeTextToUseInRegex(_value2.toLowerCase()) + '$'));
      } else {
        query.matches(columnName, new RegExp(ServiceBase.escapeTextToUseInRegex(_value2) + '$'));
      }
    }
  }

  if (conditions.has('contains_' + conditionPropKey)) {
    var _value3 = conditions.get('contains_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value3)) {
      if (columnName.endsWith('LowerCase')) {
        query.matches(columnName, new RegExp('(?=.*' + ServiceBase.escapeTextToUseInRegex(_value3.toLowerCase()) + ')'));
      } else {
        query.matches(columnName, new RegExp('(?=.*' + ServiceBase.escapeTextToUseInRegex(_value3) + ')'));
      }
    }
  }

  if (conditions.has('contains_' + conditionPropKey + 's')) {
    var values = conditions.get('contains_' + conditionPropKey + 's');

    if (_commonJavascript.Common.isNotUndefined(values) && !values.isEmpty()) {
      if (columnName.endsWith('LowerCase')) {
        query.matches(columnName, new RegExp(values.map(function (value) {
          return '(?=.*' + ServiceBase.escapeTextToUseInRegex(value.toLowerCase()) + ')';
        }).reduce(function (reduction, value) {
          return reduction + value;
        })));
      } else {
        query.matches(columnName, new RegExp(values.map(function (value) {
          return '(?=.*' + ServiceBase.escapeTextToUseInRegex(value) + ')';
        }).reduce(function (reduction, value) {
          return reduction + value;
        })));
      }
    }
  }

  if (conditions.has('ignoreCase_' + conditionPropKey)) {
    var _value4 = conditions.get(conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value4)) {
      query.matches(columnName, new RegExp('^' + ServiceBase.escapeTextToUseInRegex(_value4) + '$', 'i'));
    }
  }

  if (conditions.has('startsWith_ignoreCase_' + conditionPropKey)) {
    var _value5 = conditions.get('startsWith_ignoreCase_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value5)) {
      query.matches(columnName, new RegExp('^' + ServiceBase.escapeTextToUseInRegex(_value5), 'i'));
    }
  }

  if (conditions.has('endsWith_ignoreCase_' + conditionPropKey)) {
    var _value6 = conditions.get('endsWith_ignoreCase_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value6)) {
      query.matches(columnName, new RegExp(ServiceBase.escapeTextToUseInRegex(_value6) + '$', 'i'));
    }
  }

  if (conditions.has('contains_ignoreCase_' + conditionPropKey)) {
    var _value7 = conditions.get('contains_ignoreCase_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value7)) {
      query.matches(columnName, new RegExp('(?=.*' + ServiceBase.escapeTextToUseInRegex(_value7) + ')', 'i'));
    }
  }

  if (conditions.has('contains_ignoreCase_' + conditionPropKey + 's')) {
    var _values = conditions.get('contains_ignoreCase_' + conditionPropKey + 's');

    if (_commonJavascript.Common.isNotUndefined(_values) && !_values.isEmpty()) {
      query.matches(columnName, new RegExp(_values.map(function (value) {
        return '(?=.*' + ServiceBase.escapeTextToUseInRegex(value) + ')';
      }).reduce(function (reduction, value) {
        return reduction + value;
      })), 'i');
    }
  }
};

ServiceBase.addMultiLanguagesStringQuery = function (conditions, query, conditionPropKey, columnName, language) {
  return ServiceBase.addStringQuery(conditions, query, conditionPropKey, language + '_' + columnName);
};

ServiceBase.addGeoLocationQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('near_' + conditionPropKey)) {
    var value = conditions.get('near_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.near(columnName, value);
    }
  }

  if (conditions.has('withinGeoBox_' + conditionPropKey)) {
    var _value8 = conditions.get('withinGeoBox_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value8)) {
      query.withinGeoBox(columnName, _value8.get('southwest'), _value8.get('northeast'));
    }
  }

  if (conditions.has('withinMiles_' + conditionPropKey)) {
    var _value9 = conditions.get('withinMiles_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value9)) {
      query.withinMiles(columnName, _value9.get('point'), _value9.get('distance'));
    }
  }

  if (conditions.has('withinKilometers_' + conditionPropKey)) {
    var _value10 = conditions.get('withinKilometers_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value10)) {
      query.withinKilometers(columnName, _value10.get('point'), _value10.get('distance'));
    }
  }

  if (conditions.has('withinRadians_' + conditionPropKey)) {
    var _value11 = conditions.get('withinRadians_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(_value11)) {
      query.withinRadians(columnName, _value11.get('point'), _value11.get('distance'));
    }
  }
};

ServiceBase.addDateTimeQuery = function (conditions, query, conditionPropKey, columnName) {
  return ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);
};

ServiceBase.addNumberQuery = function (conditions, query, conditionPropKey, columnName) {
  return ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);
};

ServiceBase.addLinkQuery = function (conditions, query, conditionPropKey, columnName, ObjectType) {
  ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

  if (conditions.has(conditionPropKey + 'Id')) {
    var value = conditions.get(conditionPropKey + 'Id');

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.equalTo(columnName, ObjectType.createWithoutData(value));
    }
  }

  if (conditions.has(conditionPropKey + 's')) {
    var values = conditions.get(conditionPropKey + 's');

    if (_commonJavascript.Common.isNotUndefined(values) && !values.isEmpty()) {
      query.containedIn(columnName, values.toArray());
    }
  }

  if (conditions.has(conditionPropKey + 'Ids')) {
    var _values2 = conditions.get(conditionPropKey + 'Ids');

    if (_commonJavascript.Common.isNotUndefined(_values2) && !_values2.isEmpty()) {
      query.containedIn(columnName, _values2.map(function (id) {
        return ObjectType.createWithoutData(id);
      }).toArray());
    }
  }
};

ServiceBase.addUserLinkQuery = function (conditions, query, conditionPropKey, columnName) {
  ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

  if (conditions.has(conditionPropKey + 'Id')) {
    var value = conditions.get(conditionPropKey + 'Id');

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.equalTo(columnName, _ParseWrapperService2.default.createUserWithoutData(value));
    }
  }

  if (conditions.has(conditionPropKey + 's')) {
    var values = conditions.get(conditionPropKey + 's');

    if (_commonJavascript.Common.isNotUndefined(values) && !values.isEmpty()) {
      query.containedIn(columnName, values.toArray());
    }
  }

  if (conditions.has(conditionPropKey + 'Ids')) {
    var _values3 = conditions.get(conditionPropKey + 'Ids');

    if (_commonJavascript.Common.isNotUndefined(_values3) && !_values3.isEmpty()) {
      query.containedIn(columnName, _values3.map(function (id) {
        return _ParseWrapperService2.default.createUserWithoutData(id);
      }).toArray());
    }
  }
};

ServiceBase.addEqualityQuery = function (conditions, query, conditionPropKey, columnName) {
  ServiceBase.addEqualToQuery(conditions, query, conditionPropKey, columnName);
  ServiceBase.addNotEqualToQuery(conditions, query, conditionPropKey, columnName);
  ServiceBase.addLessThanToQuery(conditions, query, conditionPropKey, columnName);
  ServiceBase.addLessThanOrEqualToQuery(conditions, query, conditionPropKey, columnName);
  ServiceBase.addGreaterThanToQuery(conditions, query, conditionPropKey, columnName);
  ServiceBase.addGreaterThanOrEqualToQuery(conditions, query, conditionPropKey, columnName);
};

ServiceBase.addEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has(conditionPropKey)) {
    var value = conditions.get(conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.equalTo(columnName, value);
    }
  }
};

ServiceBase.addNotEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('notEqual_' + conditionPropKey)) {
    var value = conditions.get('notEqual_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.notEqualTo(columnName, value);
    }
  }
};

ServiceBase.addLessThanToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('lessThan_' + conditionPropKey)) {
    var value = conditions.get('lessThan_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.lessThan(columnName, value);
    }
  }
};

ServiceBase.addLessThanOrEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('lessThanOrEqualTo_' + conditionPropKey)) {
    var value = conditions.get('lessThanOrEqualTo_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.lessThanOrEqualTo(columnName, value);
    }
  }
};

ServiceBase.addGreaterThanToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('greaterThan_' + conditionPropKey)) {
    var value = conditions.get('greaterThan_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.greaterThan(columnName, value);
    }
  }
};

ServiceBase.addGreaterThanOrEqualToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has('greaterThanOrEqualTo_' + conditionPropKey)) {
    var value = conditions.get('greaterThanOrEqualTo_' + conditionPropKey);

    if (_commonJavascript.Common.isNotUndefined(value)) {
      query.greaterThanOrEqualTo(columnName, value);
    }
  }
};

ServiceBase.addIncludeQuery = function (criteria, query, columnName) {
  if (criteria.has('include_' + columnName)) {
    var value = criteria.get('include_' + columnName);

    if (_commonJavascript.Common.isNotUndefined(value) && value) {
      query.include(columnName);
    }
  }
};

ServiceBase.addExistenceQuery = function (conditions, query, columnName) {
  if (conditions.has('exist_' + columnName)) {
    var value = conditions.get('exists_' + columnName);

    if (_commonJavascript.Common.isNotUndefined(value) && value) {
      query.exists(columnName);
    }
  }

  if (conditions.has('doesNotExist_' + columnName)) {
    var _value12 = conditions.get('doesNotExist_' + columnName);

    if (_commonJavascript.Common.isNotUndefined(_value12) && _value12) {
      query.doesNotExist(columnName);
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.create = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(info, acl, sessionToken, useMasterKey) {
      var object, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              object = _this.ObjectType.spawn(info);


              ServiceBase.setACL(object, acl);

              _context.next = 4;
              return object.save(null, { sessionToken: sessionToken, useMasterKey: useMasterKey });

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

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  this.read = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, criteria, sessionToken, useMasterKey) {
      var query, finalQuery, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = _ParseWrapperService2.default.createQuery(_this.ObjectType).equalTo('objectId', id);
              finalQuery = _this.buildIncludeQueryFunc ? _this.buildIncludeQueryFunc(query, criteria) : query;
              _context2.next = 4;
              return finalQuery.first({ sessionToken: sessionToken, useMasterKey: useMasterKey });

            case 4:
              result = _context2.sent;

              if (!result) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', new _this.ObjectType(result).getInfo());

            case 7:
              throw new Error(_this.messagePrefix + id);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x5, _x6, _x7, _x8) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.update = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(info, sessionToken, useMasterKey) {
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
              return object.updateInfo(info).saveObject(sessionToken, useMasterKey);

            case 7:
              return _context3.abrupt('return', object.getId());

            case 8:
              throw new Error(_this.messagePrefix + info.get('id'));

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x9, _x10, _x11) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.delete = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, sessionToken, useMasterKey) {
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

              throw new Error(_this.messagePrefix + id);

            case 5:
              _context4.next = 7;
              return result.destroy({ sessionToken: sessionToken, useMasterKey: useMasterKey });

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x12, _x13, _x14) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.search = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(criteria, sessionToken, useMasterKey) {
      var results;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!_this.shouldReturnEmptyResultSet(criteria)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return', (0, _immutable.List)());

            case 2:
              _context5.next = 4;
              return _this.buildSearchQueryFunc(criteria).find({ sessionToken: sessionToken, useMasterKey: useMasterKey });

            case 4:
              results = _context5.sent;
              return _context5.abrupt('return', _immutable2.default.fromJS(results).map(function (result) {
                return new _this.ObjectType(result).getInfo();
              }));

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x15, _x16, _x17) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.searchAll = function (criteria, sessionToken, useMasterKey) {
    var event = new _extensions.NewSearchResultReceivedEvent();

    if (_this.shouldReturnEmptyResultSet(criteria)) {
      return {
        event: event,
        promise: Promise.resolve()
      };
    }

    var promise = _this.buildSearchQueryFunc(criteria).each(function (result) {
      return event.raise(new _this.ObjectType(result).getInfo());
    }, {
      sessionToken: sessionToken,
      useMasterKey: useMasterKey
    });

    return {
      event: event,
      promise: promise
    };
  };

  this.count = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(criteria, sessionToken, useMasterKey) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!_this.shouldReturnEmptyResultSet(criteria)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt('return', (0, _immutable.List)());

            case 2:
              _context6.next = 4;
              return _this.buildSearchQueryFunc(criteria).count({ sessionToken: sessionToken, useMasterKey: useMasterKey });

            case 4:
              return _context6.abrupt('return', _context6.sent);

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x18, _x19, _x20) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.exists = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(criteria, sessionToken, useMasterKey) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _this.count(criteria, sessionToken, useMasterKey);

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

    return function (_x21, _x22, _x23) {
      return _ref7.apply(this, arguments);
    };
  }();

  this.shouldReturnEmptyResultSet = function (criteria) {
    if (criteria && criteria.has('ids')) {
      var objectIds = criteria.get('ids');

      if (objectIds && objectIds.isEmpty()) {
        return true;
      }
    }

    return false;
  };
};

exports.default = ServiceBase;