'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParseWrapperService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var ParseWrapperService = function () {
  function ParseWrapperService() {
    _classCallCheck(this, ParseWrapperService);
  }

  _createClass(ParseWrapperService, null, [{
    key: 'createUserQuery',
    value: function createUserQuery() {
      return new Parse.Query(Parse.User);
    }
  }, {
    key: 'createQuery',
    value: function createQuery(object, criteria) {
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
          query.descending('createdAt');
          query.limit(1);
        }
      }

      if (criteria.has('fields')) {
        var fields = criteria.get('fields');

        if (fields) {
          query.select(fields.toArray());
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
    }
  }, {
    key: 'createOrQuery',
    value: function createOrQuery(queries) {
      return Parse.Query.or.apply(this, queries.toArray());
    }
  }, {
    key: 'createQueryIncludingObjectIds',
    value: function createQueryIncludingObjectIds(object, query, criteria) {
      if (!criteria) {
        return query;
      }

      var conditions = criteria.get('conditions');

      if (!conditions) {
        return query;
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
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return Parse.Config.get();
    }
  }, {
    key: 'getCachedConfig',
    value: function getCachedConfig() {
      return Parse.Config.current();
    }
  }, {
    key: 'getCurrentUser',
    value: function getCurrentUser() {
      return Parse.User.current();
    }
  }, {
    key: 'getCurrentUserAsync',
    value: function getCurrentUserAsync() {
      return Parse.User.currentAsync();
    }
  }, {
    key: 'createNewUser',
    value: function createNewUser() {
      return new Parse.User();
    }
  }, {
    key: 'createUserWithoutData',
    value: function createUserWithoutData(userId) {
      return Parse.User.createWithoutData(userId);
    }
  }, {
    key: 'logIn',
    value: function logIn(username, password) {
      return Parse.User.logIn(username, password);
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      return Parse.User.logOut();
    }
  }]);

  return ParseWrapperService;
}();

exports.ParseWrapperService = ParseWrapperService;
exports.default = ParseWrapperService;