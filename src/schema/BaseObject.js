// @flow

import Parse from 'parse/node';

export default class BaseObject extends Parse.Object {
  constructor(object, className) {
    super(className);

    this.object = object;
  }

  getObject = () => this.object || this;

  saveObject = sessionToken => this.getObject().save({ sessionToken });

  getId = () => this.getObject().id;
}
