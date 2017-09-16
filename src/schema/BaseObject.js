// @flow

import Parse from 'parse/node';
import { ParseWrapperService } from '../services';

export default class BaseObject extends Parse.Object {
  constructor(object, className) {
    super(className);

    this.object = object;
  }

  getObject = () => this.object || this;

  saveObject = sessionToken => this.getObject().save(null, { sessionToken });

  getId = () => this.getObject().id;

  static createStringColumn = (object, info, columnName) => {
    const value = info.get(columnName);

    object.set(columnName, value);
    object.set(`${columnName}LowerCase`, value ? value.toLowerCase() : undefined);
  };

  static createUserPointer = (object, info, columnName) => {
    if (info.has(`${columnName}Id`)) {
      const id = info.get(`${columnName}Id`);

      if (id) {
        object.set(columnName, ParseWrapperService.createUserWithoutData(id));
      }
    } else if (info.has(columnName)) {
      const refObject = info.get(columnName);

      if (refObject) {
        object.set(columnName, refObject);
      }
    }
  };

  static createUserArrayPointer = (object, info, columnName) => {
    if (info.has(`${columnName}Ids`)) {
      const ids = info.get(`${columnName}Ids`);

      if (ids && !ids.isEmpty()) {
        object.set(`${columnName}s`, ids.map(id => ParseWrapperService.createUserWithoutData(id)).toArray());
      } else {
        object.set(`${columnName}s`, []);
      }
    } else if (info.has(`${columnName}s`)) {
      const refObjects = info.get(`${columnName}s`);

      if (refObjects && !refObjects.isEmpty()) {
        object.set(`${columnName}s`, refObjects.toArray());
      } else {
        object.set(`${columnName}s`, []);
      }
    }
  };

  static createPointer = (object, info, columnName, ObjectType) => {
    if (info.has(`${columnName}Id`)) {
      const id = info.get(`${columnName}Id`);

      if (id) {
        object.set(columnName, ObjectType.createWithoutData(id));
      }
    } else if (info.has(columnName)) {
      const refObject = info.get(columnName);

      if (refObject) {
        object.set(columnName, refObject);
      }
    }
  };

  static createArrayPointer = (object, info, columnName, ObjectType) => {
    if (info.has(`${columnName}Ids`)) {
      const ids = info.get(`${columnName}Ids`);

      if (ids && !ids.isEmpty()) {
        object.set(`${columnName}s`, ids.map(id => ObjectType.createWithoutData(id)).toArray());
      } else {
        object.set(`${columnName}s`, []);
      }
    } else if (info.has(`${columnName}s`)) {
      const refObjects = info.get(`${columnName}s`);

      if (refObjects && !refObjects.isEmpty()) {
        object.set(`${columnName}s`, refObjects.toArray());
      } else {
        object.set(`${columnName}s`, []);
      }
    }
  };
}
