'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _node = require('parse/node');

var _node2 = _interopRequireDefault(_node);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line import/no-extraneous-dependencies


var BaseObject = function (_Parse$Object) {
  _inherits(BaseObject, _Parse$Object);

  function BaseObject(object, className) {
    _classCallCheck(this, BaseObject);

    var _this = _possibleConstructorReturn(this, (BaseObject.__proto__ || Object.getPrototypeOf(BaseObject)).call(this, className));

    _initialiseProps.call(_this);

    _this.object = object;
    return _this;
  }

  return BaseObject;
}(_node2.default.Object);

BaseObject.createStringColumn = function (object, info, columnName) {
  var value = info.get(columnName);

  object.set(columnName, value);
  object.set(columnName + 'LowerCase', value ? value.toLowerCase() : undefined);
};

BaseObject.createMultiLanguagesStringColumn = function (object, info, columnName) {
  var languages = info.get(columnName);

  if (!_immutable.Map.isMap(languages)) {
    throw new Error('Provided value is not of type Map.');
  }

  var allProvidedLanguages = languages.keySeq().toArray();

  object.set('languages_' + columnName, allProvidedLanguages);

  allProvidedLanguages.forEach(function (language) {
    var value = languages.get(language);

    object.set(language + '_' + columnName, value);
    object.set(language + '_' + columnName + 'LowerCase', value ? value.toLowerCase() : undefined);
  });
};

BaseObject.createUserPointer = function (object, info, columnName) {
  if (info.has(columnName + 'Id')) {
    var id = info.get(columnName + 'Id');

    if (id) {
      object.set(columnName, _services.ParseWrapperService.createUserWithoutData(id));
    }
  } else if (info.has(columnName)) {
    var refObject = info.get(columnName);

    if (refObject) {
      object.set(columnName, refObject);
    }
  }
};

BaseObject.createUserArrayPointer = function (object, info, columnName) {
  if (info.has(columnName + 'Ids')) {
    var ids = info.get(columnName + 'Ids');

    if (ids && !ids.isEmpty()) {
      object.set(columnName + 's', ids.map(function (id) {
        return _services.ParseWrapperService.createUserWithoutData(id);
      }).toArray());
    } else {
      object.set(columnName + 's', []);
    }
  } else if (info.has(columnName + 's')) {
    var refObjects = info.get(columnName + 's');

    if (refObjects && !refObjects.isEmpty()) {
      object.set(columnName + 's', refObjects.toArray());
    } else {
      object.set(columnName + 's', []);
    }
  }
};

BaseObject.createPointer = function (object, info, columnName, ObjectType) {
  if (info.has(columnName + 'Id')) {
    var id = info.get(columnName + 'Id');

    if (id) {
      object.set(columnName, ObjectType.createWithoutData(id));
    }
  } else if (info.has(columnName)) {
    var refObject = info.get(columnName);

    if (refObject) {
      object.set(columnName, refObject);
    }
  }
};

BaseObject.createArrayPointer = function (object, info, columnName, ObjectType) {
  if (info.has(columnName + 'Ids')) {
    var ids = info.get(columnName + 'Ids');

    if (ids && !ids.isEmpty()) {
      object.set(columnName + 's', ids.map(function (id) {
        return ObjectType.createWithoutData(id);
      }).toArray());
    } else {
      object.set(columnName + 's', []);
    }
  } else if (info.has(columnName + 's')) {
    var refObjects = info.get(columnName + 's');

    if (refObjects && !refObjects.isEmpty()) {
      object.set(columnName + 's', refObjects.toArray());
    } else {
      object.set(columnName + 's', []);
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getObject = function () {
    return _this2.object || _this2;
  };

  this.saveObject = function (sessionToken) {
    return _this2.getObject().save(null, { sessionToken: sessionToken });
  };

  this.getId = function () {
    return _this2.getObject().id;
  };

  this.getMultiLanguagesString = function (columnName) {
    var object = _this2.getObject();
    var languages = _immutable2.default.fromJS(object.get('languages_' + columnName));

    if (!languages) {
      return (0, _immutable.Map)();
    }

    return languages.reduce(function (reduction, language) {
      return reduction.set(language, object.get(language + '_' + columnName));
    }, (0, _immutable.Map)());
  };
};

exports.default = BaseObject;