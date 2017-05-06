'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parse = void 0;

if (_platform2.default === 'node') {
  Parse = require('parse/node'); // eslint-disable-line global-require
} else if (_platform2.default === 'browser') {
  Parse = require('parse'); // eslint-disable-line global-require
} else {
  Parse = require('parse/react-native'); // eslint-disable-line global-require
}

var ParseWrapperService = function ParseWrapperService() {
  _classCallCheck(this, ParseWrapperService);
};

ParseWrapperService.createQuery = function (object, criteria) {
  var query = new Parse.Query(object);

  if (!criteria) {
    return query;
  }

  if (criteria.has('limit')) {
    var value = criteria.get('limit');

    if (value) {
      query.limit(value);
    }
  }

  if (criteria.has('skip')) {
    var _value = criteria.get('skip');

    if (_value) {
      query.skip(_value);
    }
  }

  if (criteria.has('topMost')) {
    var _value2 = criteria.get('topMost');

    if (_value2) {
      query.descending('createdAt').limit(1);
    }
  }

  if (criteria.has('field')) {
    var field = criteria.get('field');

    if (field) {
      query.select([field]);
    }
  }

  if (criteria.has('fields')) {
    var fields = criteria.get('fields');

    if (fields) {
      query.select(fields.toArray());
    }
  }

  if (criteria.has('inlcludeField')) {
    var _field = criteria.get('inlcludeField');

    if (_field) {
      query.include(_field);
    }
  }

  if (criteria.has('inlcludeFields')) {
    var _fields = criteria.get('inlcludeFields');

    if (_fields) {
      _fields.forEach(function (field) {
        return query.include(field);
      });
    }
  }

  if (criteria.has('ascending')) {
    var _value3 = criteria.get('ascending');

    if (_value3) {
      query.ascending(_value3);
    }
  }

  if (criteria.has('descending')) {
    var _value4 = criteria.get('descending');

    if (_value4) {
      query.descending(_value4);
    }
  }

  return query;
};

ParseWrapperService.createQueryIncludingObjectIds = function (object, query, criteria) {
  if (!criteria) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (!conditions) {
    return query;
  }

  if (conditions.has('id')) {
    var objectId = conditions.get('id');

    if (objectId) {
      var objectIdQuery = new Parse.Query(object);

      objectIdQuery.equalTo('objectId', objectId);

      return ParseWrapperService.createOrQuery(_immutable.List.of(objectIdQuery, query));
    }
  }

  if (conditions.has('ids')) {
    var objectIds = conditions.get('ids');

    if (objectIds && !objectIds.isEmpty()) {
      return ParseWrapperService.createOrQuery(objectIds.map(function (objectId) {
        var objectIdQuery = new Parse.Query(object);

        objectIdQuery.equalTo('objectId', objectId);

        return objectIdQuery;
      }).push(query));
    }
  }

  return query;
};

ParseWrapperService.createOrQuery = function (queries) {
  return Parse.Query.or.apply(undefined, queries.toArray());
};

ParseWrapperService.createUserQuery = function () {
  return new Parse.Query(Parse.User);
};

ParseWrapperService.getConfig = function () {
  return Parse.Config.get();
};

ParseWrapperService.getCachedConfig = function () {
  return Parse.Config.current();
};

ParseWrapperService.getCurrentUser = function () {
  return Parse.User.current();
};

ParseWrapperService.getCurrentUserAsync = function () {
  return Parse.User.currentAsync();
};

ParseWrapperService.createNewUser = function () {
  return new Parse.User();
};

ParseWrapperService.createUserWithoutData = function (userId) {
  return Parse.User.createWithoutData(userId);
};

ParseWrapperService.logIn = function (username, password) {
  return Parse.User.logIn(username, password);
};

ParseWrapperService.logOut = function () {
  return Parse.User.logOut();
};

exports.default = ParseWrapperService;