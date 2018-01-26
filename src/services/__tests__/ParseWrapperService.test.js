// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { BaseObject } from '../../schema';
import { ParseWrapperService } from '../';

class TestObject extends BaseObject {
  static spawn = (info) => {
    const object = new TestObject();

    TestObject.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('data', info.get('data'));
  };

  constructor(object) {
    super(object, 'TestObject');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    TestObject.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () =>
    Map({
      id: this.getId(),
      data: this.getObject().get('data'),
    });
}

describe('createQuery', () => {
  test('should return the object when existing id provided.', async () => {
    const data = uuid();
    const object = await TestObject.spawn(Map({ data })).save();
    const criteria = Map({
      fields: List.of('data'),
      id: object.getId(),
    });
    const query = ParseWrapperService.createQuery(TestObject, criteria);
    const foundObjects = await query.find();

    expect(foundObjects).toBeTruthy();
    expect(foundObjects).toHaveLength(1);
    expect(foundObjects[0].get('data')).toEqual(data);
  });

  test('should return the object when existing ids provided.', async () => {
    const data1 = uuid();
    const data2 = uuid();
    const object1 = await TestObject.spawn(Map({ data: data1 })).save();
    const object2 = await TestObject.spawn(Map({ data: data2 })).save();
    const criteria = Map({
      ids: List.of(object1.getId(), object2.getId()),
    });
    const query = ParseWrapperService.createQuery(TestObject, criteria);
    const foundObjects = await query.find();

    expect(foundObjects).toBeTruthy();
    expect(foundObjects).toHaveLength(2);
    expect(foundObjects[0].get('data')).toEqual(data1);
    expect(foundObjects[1].get('data')).toEqual(data2);
  });
});
