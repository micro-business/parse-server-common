import Parse from 'parse/node';

class BaseObject extends Parse.Object {
  constructor(object, className) {
    super(className);

    this.object = object;

    this.getObject = this.getObject.bind(this);
    this.getId = this.getId.bind(this);
  }

  getObject() {
    return this.object || this;
  }

  getId() {
    return this.getObject()
      .id;
  }

  saveObject() {
    return this.getObject()
      .save();
  }
}

export default BaseObject;
