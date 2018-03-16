'use strict';

var _immutable = require('immutable');

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

require('../../../bootstrap');

var _schema = require('../../schema');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestObject = function (_BaseObject) {
  _inherits(TestObject, _BaseObject);

  function TestObject(object) {
    _classCallCheck(this, TestObject);

    var _this = _possibleConstructorReturn(this, (TestObject.__proto__ || Object.getPrototypeOf(TestObject)).call(this, object, 'TestObject'));

    _initialiseProps.call(_this);

    return _this;
  }

  return TestObject;
}(_schema.BaseObject);

TestObject.spawn = function (info) {
  var object = new TestObject();

  TestObject.updateInfoInternal(object, info);

  return object;
};

TestObject.updateInfoInternal = function (object, info) {
  object.set('data', info.get('data'));
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function (info) {
    var object = _this2.getObject();

    TestObject.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function () {
    return (0, _immutable.Map)({
      id: _this2.getId(),
      data: _this2.getObject().get('data')
    });
  };
};

describe('createQuery', function () {
  test('should return the object when existing id provided.', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, object, criteria, query, foundObjects;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = (0, _cuid2.default)();
            _context.next = 3;
            return TestObject.spawn((0, _immutable.Map)({ data: data })).save();

          case 3:
            object = _context.sent;
            criteria = (0, _immutable.Map)({
              fields: _immutable.List.of('data'),
              id: object.getId()
            });
            query = _.ParseWrapperService.createQuery(TestObject, criteria);
            _context.next = 8;
            return query.find();

          case 8:
            foundObjects = _context.sent;


            expect(foundObjects).toBeTruthy();
            expect(foundObjects).toHaveLength(1);
            expect(foundObjects[0].get('data')).toEqual(data);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should return the object when existing ids provided.', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var data1, data2, object1, object2, criteria, query, foundObjects;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data1 = (0, _cuid2.default)();
            data2 = (0, _cuid2.default)();
            _context2.next = 4;
            return TestObject.spawn((0, _immutable.Map)({ data: data1 })).save();

          case 4:
            object1 = _context2.sent;
            _context2.next = 7;
            return TestObject.spawn((0, _immutable.Map)({ data: data2 })).save();

          case 7:
            object2 = _context2.sent;
            criteria = (0, _immutable.Map)({
              ids: _immutable.List.of(object1.getId(), object2.getId())
            });
            query = _.ParseWrapperService.createQuery(TestObject, criteria);
            _context2.next = 12;
            return query.find();

          case 12:
            foundObjects = _context2.sent;


            expect(foundObjects).toBeTruthy();
            expect(foundObjects).toHaveLength(2);
            expect(foundObjects[0].get('data')).toEqual(data1);
            expect(foundObjects[1].get('data')).toEqual(data2);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});