// @flow

import Immutable from 'immutable';
import { NewSearchResultReceivedEvent } from 'micro-business-common-javascript';
import ParseWrapperService from './ParseWrapperService';

export default class ServiceBase {
  static setACL = (object, acl) => {
    if (acl) {
      object.setACL(acl);
    }
  };

  static addStringQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(conditionPropKey)) {
      const value = conditions.get(conditionPropKey);

      if (value) {
        query.matches(columnName, new RegExp(`^${value}$`));

        return true;
      }
    }

    if (conditions.has(`startsWith_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`^${value}`));

        return true;
      }
    }

    if (conditions.has(`endsWith_${conditionPropKey}`)) {
      const value = conditions.get(`endsWith_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`${value}$`));

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}`)) {
      const value = conditions.get(`contains_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`(?=.*${value})`));

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_${conditionPropKey}s`);

      if (values && !values.isEmpty()) {
        query.matches(columnName, new RegExp(values.map(value => `(?=.*${value})`).reduce((reduction, value) => reduction + value)));

        return true;
      }
    }

    if (conditions.has(`ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(conditionPropKey);

      if (value) {
        query.matches(columnName, new RegExp(`^${value.toLowerCase()}$`, 'i'));

        return true;
      }
    }

    if (conditions.has(`startsWith_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_ignoreCase_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`^${value.toLowerCase()}`, 'i'));

        return true;
      }
    }

    if (conditions.has(`endsWith_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`endsWith_ignoreCase_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`${value.toLowerCase()}$`, 'i'));

        return true;
      }
    }

    if (conditions.has(`contains_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`contains_ignoreCase_${conditionPropKey}`);

      if (value) {
        query.matches(columnName, new RegExp(`(?=.*${value.toLowerCase()})`, 'i'));

        return true;
      }
    }

    if (conditions.has(`contains_ignoreCase_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_ignoreCase_${conditionPropKey}s`);

      if (values && !values.isEmpty()) {
        query.matches(
          columnName,
          new RegExp(values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value)),
          'i',
        );

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

  static addUserLinkQuery = (conditions, query, conditionPropKey, columnName) => {
    if (ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName)) {
      return true;
    }

    if (conditions.has(`${conditionPropKey}Id`)) {
      const value = conditions.get(`${conditionPropKey}Id`);

      if (value) {
        query.equalTo(columnName, ParseWrapperService.createUserWithoutData(value));

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
        query.containedIn(columnName, value.map(id => ParseWrapperService.createUserWithoutData(id)).toArray());

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

  static addIncludeQuery = (criteria, query, columnName) => {
    if (criteria.has(`include_${columnName}`)) {
      const value = criteria.get(`include_${columnName}`);

      if (value) {
        query.include(columnName);

        return true;
      }
    }

    return false;
  };

  static addExistenceQuery = (conditions, query, columnName) => {
    if (conditions.has(`exist_${columnName}`)) {
      const value = conditions.get(`exists_${columnName}`);

      if (value) {
        query.exists(columnName);

        return true;
      }
    }

    if (conditions.has(`doesNotExist_${columnName}`)) {
      const value = conditions.get(`doesNotExist_${columnName}`);

      if (value) {
        query.doesNotExist(columnName);

        return true;
      }
    }

    return false;
  };

  constructor(ObjectType, buildSearchQueryFunc, buildIncludeQueryFunc, objectFriendlyName) {
    this.ObjectType = ObjectType;
    this.buildSearchQueryFunc = buildSearchQueryFunc;
    this.buildIncludeQueryFunc = buildIncludeQueryFunc;
    this.messagePrefix = `No ${objectFriendlyName} found with Id: `;
  }

  create = async (info, acl, sessionToken) => {
    const object = this.ObjectType.spawn(info);

    ServiceBase.setACL(object, acl);

    const result = await object.save(null, { sessionToken });

    return result.id;
  };

  read = async (id, criteria, sessionToken) => {
    const query = ParseWrapperService.createQuery(this.ObjectType).equalTo('objectId', id);
    const finalQuery = this.buildIncludeQueryFunc ? this.buildIncludeQueryFunc(query, criteria) : query;
    const result = await finalQuery.first({ sessionToken });

    if (result) {
      return new this.ObjectType(result).getInfo();
    }

    throw new Error(this.messagePrefix + id);
  };

  update = async (info, sessionToken) => {
    const result = await ParseWrapperService.createQuery(this.ObjectType)
      .equalTo('objectId', info.get('id'))
      .first({ sessionToken });

    if (result) {
      const object = new this.ObjectType(result);

      await object.updateInfo(info).saveObject(sessionToken);

      return object.getId();
    }

    throw new Error(this.messagePrefix + info.get('id'));
  };

  delete = async (id, sessionToken) => {
    const result = await ParseWrapperService.createQuery(this.ObjectType)
      .equalTo('objectId', id)
      .first({ sessionToken });

    if (!result) {
      throw new Error(this.messagePrefix + id);
    }

    await result.destroy({ sessionToken });
  };

  search = async (criteria, sessionToken) => {
    const results = await this.buildSearchQueryFunc(criteria).find({ sessionToken });

    return Immutable.fromJS(results).map(result => new this.ObjectType(result).getInfo());
  };

  searchAll = (criteria, sessionToken) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = this.buildSearchQueryFunc(criteria).each(result => event.raise(new this.ObjectType(result).getInfo()), { sessionToken });

    return {
      event,
      promise,
    };
  };

  count = async (criteria, sessionToken) => this.buildSearchQueryFunc(criteria).count({ sessionToken });

  exists = async (criteria, sessionToken) => (await this.count(criteria, sessionToken)) > 0;
}
