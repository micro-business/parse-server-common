import isNode from 'detect-node';

let Parse;

if (isNode) {
  Parse = require('parse/node'); // eslint-disable-line global-require
} else if (typeof window !== 'undefined') {
  Parse = require('parse'); // eslint-disable-line global-require
} else {
  Parse = require('parse/react-native'); // eslint-disable-line global-require
}

class BaseObject extends Parse.Object {
  constructor(object, className) {
    super(className);

    this.object = object;

    this.getObject = this.getObject.bind(this);
    this.saveObject = this.saveObject.bind(this);
    this.getId = this.getId.bind(this);
  }

  getObject() {
    return this.object || this;
  }

  saveObject() {
    return this.getObject()
      .save();
  }

  getId() {
    return this.getObject()
      .id;
  }
}

export {
  BaseObject,
};

export default BaseObject;
