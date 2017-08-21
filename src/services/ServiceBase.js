// @flow

import Immutable, { Range } from 'immutable';
import ParseWrapperService from './ParseWrapperService';
import Exception from './Exception';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class ServiceBase {
  static splitIntoChunks = (list, chunkSize) => Range(0, list.count(), chunkSize).map(chunkStart => list.slice(chunkStart, chunkStart + chunkSize));

  static create = async (ObjectType, info, acl, sessionToken) => {
    const object = ObjectType.spawn(info);

    ServiceBase.setACL(object, acl);

    const result = await object.save(null, { sessionToken });

    return result.id;
  };

  static read = async (ObjectType, id, sessionToken, messagePrefix, modifyQueryFunc) => {
    const query = ParseWrapperService.createQuery(ObjectType).equalTo('objectId', id);
    const finalQuery = modifyQueryFunc ? modifyQueryFunc(query) : query;
    const result = await finalQuery.first({ sessionToken });

    if (result) {
      return new ObjectType(result).getInfo();
    }

    throw new Exception(messagePrefix + id);
  };

  static update = async (ObjectType, info, sessionToken, messagePrefix) => {
    const result = await ParseWrapperService.createQuery(ObjectType).equalTo('objectId', info.get('id')).first({ sessionToken });

    if (result) {
      const object = new ObjectType(result);

      await object.updateInfo(info).saveObject(sessionToken);

      return object.getId();
    }

    throw new Exception(messagePrefix + info.get('id'));
  };

  static delete = async (ObjectType, id, sessionToken, messagePrefix) => {
    const result = await ParseWrapperService.createQuery(ObjectType).equalTo('objectId', id).first({ sessionToken });

    if (!result) {
      throw new Exception(messagePrefix + id);
    }

    await result.destroy({ sessionToken });
  };

  static search = async (ObjectType, buildSearchQueryFunc, criteria, sessionToken) => {
    const results = await buildSearchQueryFunc(criteria).find({ sessionToken });

    return Immutable.fromJS(results).map(_ => new ObjectType(_).getInfo());
  };

  static searchAll = (ObjectType, buildSearchQueryFunc, criteria, sessionToken) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = buildSearchQueryFunc(criteria).each(_ => event.raise(new ObjectType(_).getInfo()), { sessionToken });

    return {
      event,
      promise,
    };
  };

  static count = async (buildSearchQueryFunc, criteria, sessionToken) => buildSearchQueryFunc(criteria).count({ sessionToken });

  static exists = async (buildSearchQueryFunc, criteria, sessionToken) => (await ServiceBase.count(buildSearchQueryFunc, criteria, sessionToken)) > 0;

  static setACL = (object, acl) => {
    if (acl) {
      object.setACL(acl);
    }
  };

  static addStringSearchToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(conditionPropKey)) {
      const value = conditions.get(conditionPropKey);

      if (value) {
        query.matches(columnName, new RegExp(`^${value}$`, 'i'));

        return true;
      }
    }

    if (conditions.has(`startsWith_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`^${value}`, 'i'));

        return true;
      }
    }

    if (conditions.has(`endsWith_${conditionPropKey}`)) {
      const value = conditions.get(`endsWith_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`${value}$`, 'i'));

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}`)) {
      const value = conditions.get(`contains_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`(?=.*${value})`, 'i'));

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_${conditionPropKey}s`);

      if (values && !values.isEmpty()) {
        query.matches(columnName, new RegExp(values.map(value => `(?=.*${value})`).reduce((reduction, value) => reduction + value)), 'i');

        return true;
      }
    }

    return false;
  };
}
