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

      if (criteria.has('fields') && criteria.get('fields')) {
        var fields = criteria.get('fields');

        if (fields) {
          query.select(fields.toArray());
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