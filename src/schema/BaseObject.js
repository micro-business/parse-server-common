// @flow

import Parse from 'parse/node';

export default class BaseObject extends Parse.Object {
  constructor(object, className) {
    super(className);

    this.object = object;
  }

  getObject = () => this.object || this;
  saveObject = () => this.getObject().save();
  getId = () => this.getObject().id;
}
