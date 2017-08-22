// @flow

import Immutable from 'immutable';
import { Exception, NewSearchResultReceivedEvent } from 'micro-business-common-javascript';
import ParseWrapperService from './ParseWrapperService';

export default class ServiceBase {
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

  static addStringQuery = (conditions, query, conditionPropKey, columnName) => {
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

  static addGeoLocationQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`near_${conditionPropKey}`)) {
      const value = conditions.get(`near_${conditionPropKey}`);

      if (value) {
        query.near(columnName, value);

        return true;
      }
    }

    if (conditions.has(`withinGeoBox_${conditionPropKey}`)) {
      const value = conditions.get(`withinGeoBox_${conditionPropKey}`);

      if (value) {
        query.withinGeoBox(columnName, value.get('southwest'), value.get('northeast'));

        return true;
      }
    }

    if (conditions.has(`withinMiles_${conditionPropKey}`)) {
      const value = conditions.get(`withinMiles_${conditionPropKey}`);

      if (value) {
        query.withinMiles(columnName, value.get('point'), value.get('distance'));

        return true;
      }
    }

    if (conditions.has(`withinKilometers_${conditionPropKey}`)) {
      const value = conditions.get(`withinKilometers_${conditionPropKey}`);

      if (value) {
        query.withinKilometers(columnName, value.get('point'), value.get('distance'));

        return true;
      }
    }

    if (conditions.has(`withinRadians_${conditionPropKey}`)) {
      const value = conditions.get(`withinRadians_${conditionPropKey}`);

      if (value) {
        query.withinRadians(columnName, value.get('point'), value.get('distance'));

        return true;
      }
    }

    return false;
  };

  static addDateTimeQuery = (conditions, query, conditionPropKey, columnName) =>
    ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

  static addNumberQuery = (conditions, query, conditionPropKey, columnName) =>
    ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

  static addLinkQuery = (conditions, query, conditionPropKey, columnName, ObjectType) => {
    if (ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (conditions.has(`${conditionPropKey}Id`)) {
      const value = conditions.get(`${conditionPropKey}Id`);

      if (value) {
        query.equalTo(columnName, ObjectType.createWithoutData(value));

        return true;
      }
    }

    if (conditions.has(`${conditionPropKey}s`)) {
      const value = conditions.get(`${conditionPropKey}s`);

      if (value && !value.isEmpty()) {
        query.containedIn(columnName, value);

        return true;
      }
    }

    if (conditions.has(`${conditionPropKey}Ids`)) {
      const value = conditions.get(`${conditionPropKey}Ids`);

      if (value && !value.isEmpty()) {
        query.containedIn(columnName, value.map(id => ObjectType.createWithoutData(id)).toArray());

        return true;
      }
    }

    return false;
  };

  static addEqualityQuery = (conditions, query, conditionPropKey, columnName) => {
    if (ServiceBase.addEqualToQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (ServiceBase.addNotEqualToQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (ServiceBase.addLessThanToQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (ServiceBase.addLessThanOrEqualToQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (ServiceBase.addGreaterThanToQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (ServiceBase.addGreaterThanOrEqualToQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    return false;
  };

  static addEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(conditionPropKey)) {
      const value = conditions.get(conditionPropKey);

      if (value) {
        query.equalTo(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addNotEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`notEqual_${conditionPropKey}`)) {
      const value = conditions.get(`notEqual_${conditionPropKey}`);

      if (value) {
        query.notEqualTo(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addLessThanToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`lessThan_${conditionPropKey}`)) {
      const value = conditions.get(`lessThan_${conditionPropKey}`);

      if (value) {
        query.lessThan(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addLessThanOrEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`lessThanOrEqualTo_${conditionPropKey}`)) {
      const value = conditions.get(`lessThanOrEqualTo_${conditionPropKey}`);

      if (value) {
        query.lessThanOrEqualTo(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addGreaterThanToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`greaterThan_${conditionPropKey}`)) {
      const value = conditions.get(`greaterThan_${conditionPropKey}`);

      if (value) {
        query.greaterThan(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addGreaterThanOrEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`greaterThanOrEqualTo_${conditionPropKey}`)) {
      const value = conditions.get(`greaterThanOrEqualTo_${conditionPropKey}`);

      if (value) {
        query.greaterThanOrEqualTo(columnName, value);

        return true;
      }
    }

    return false;
  };
}
