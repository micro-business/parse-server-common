// @flow

import Immutable from 'immutable';
import { NewSearchResultReceivedEvent } from '@microbusiness/common-javascript';
import ParseWrapperService from './ParseWrapperService';

export default class ServiceBase {
  static setACL = (object, acl) => {
    if (acl) {
      object.setACL(acl);
    }
  };

  static escapeTextToUseInRegex = str => str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

  static addStringQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(conditionPropKey)) {
      const value = conditions.get(conditionPropKey);

      if (typeof value !== 'undefined') {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())}$`));
        } else {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}$`));
        }

        return true;
      }
    }

    if (conditions.has(`startsWith_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())}`));
        } else {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}`));
        }

        return true;
      }
    }

    if (conditions.has(`endsWith_${conditionPropKey}`)) {
      const value = conditions.get(`endsWith_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())}$`));
        } else {
          query.matches(columnName, new RegExp(`${ServiceBase.escapeTextToUseInRegex(value)}$`));
        }

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}`)) {
      const value = conditions.get(`contains_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`(?=.*${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())})`));
        } else {
          query.matches(columnName, new RegExp(`(?=.*${ServiceBase.escapeTextToUseInRegex(value)})`));
        }

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_${conditionPropKey}s`);

      if (typeof values !== 'undefined' && !values.isEmpty()) {
        if (columnName.endsWith('LowerCase')) {
          query.matches(
            columnName,
            new RegExp(values.map(value => `(?=.*${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())})`).reduce((reduction, value) => reduction + value)),
          );
        } else {
          query.matches(
            columnName,
            new RegExp(values.map(value => `(?=.*${ServiceBase.escapeTextToUseInRegex(value)})`).reduce((reduction, value) => reduction + value)),
          );
        }

        return true;
      }
    }

    if (conditions.has(`ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(conditionPropKey);

      if (typeof value !== 'undefined') {
        query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}$`, 'i'));

        return true;
      }
    }

    if (conditions.has(`startsWith_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_ignoreCase_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}`, 'i'));

        return true;
      }
    }

    if (conditions.has(`endsWith_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`endsWith_ignoreCase_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.matches(columnName, new RegExp(`${ServiceBase.escapeTextToUseInRegex(value)}$`, 'i'));

        return true;
      }
    }

    if (conditions.has(`contains_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`contains_ignoreCase_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.matches(columnName, new RegExp(`(?=.*${ServiceBase.escapeTextToUseInRegex(value)})`, 'i'));

        return true;
      }
    }

    if (conditions.has(`contains_ignoreCase_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_ignoreCase_${conditionPropKey}s`);

      if (typeof values !== 'undefined' && !values.isEmpty()) {
        query.matches(
          columnName,
          new RegExp(values.map(value => `(?=.*${ServiceBase.escapeTextToUseInRegex(value)})`).reduce((reduction, value) => reduction + value)),
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

      if (typeof value !== 'undefined') {
        query.near(columnName, value);

        return true;
      }
    }

    if (conditions.has(`withinGeoBox_${conditionPropKey}`)) {
      const value = conditions.get(`withinGeoBox_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.withinGeoBox(columnName, value.get('southwest'), value.get('northeast'));

        return true;
      }
    }

    if (conditions.has(`withinMiles_${conditionPropKey}`)) {
      const value = conditions.get(`withinMiles_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.withinMiles(columnName, value.get('point'), value.get('distance'));

        return true;
      }
    }

    if (conditions.has(`withinKilometers_${conditionPropKey}`)) {
      const value = conditions.get(`withinKilometers_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.withinKilometers(columnName, value.get('point'), value.get('distance'));

        return true;
      }
    }

    if (conditions.has(`withinRadians_${conditionPropKey}`)) {
      const value = conditions.get(`withinRadians_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
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

      if (typeof value !== 'undefined') {
        query.equalTo(columnName, ObjectType.createWithoutData(value));

        return true;
      }
    }

    if (conditions.has(`${conditionPropKey}s`)) {
      const values = conditions.get(`${conditionPropKey}s`);

      if (typeof values !== 'undefined' && !values.isEmpty()) {
        query.containedIn(columnName, values.toArray());

        return true;
      }
    }

    if (conditions.has(`${conditionPropKey}Ids`)) {
      const values = conditions.get(`${conditionPropKey}Ids`);

      if (typeof values !== 'undefined' && !values.isEmpty()) {
        query.containedIn(columnName, values.map(id => ObjectType.createWithoutData(id)).toArray());

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

      if (typeof value !== 'undefined') {
        query.equalTo(columnName, ParseWrapperService.createUserWithoutData(value));

        return true;
      }
    }

    if (conditions.has(`${conditionPropKey}s`)) {
      const values = conditions.get(`${conditionPropKey}s`);

      if (typeof values !== 'undefined' && !values.isEmpty()) {
        query.containedIn(columnName, values.toArray());

        return true;
      }
    }

    if (conditions.has(`${conditionPropKey}Ids`)) {
      const values = conditions.get(`${conditionPropKey}Ids`);

      if (typeof values !== 'undefined' && !values.isEmpty()) {
        query.containedIn(columnName, values.map(id => ParseWrapperService.createUserWithoutData(id)).toArray());

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

      if (typeof value !== 'undefined') {
        query.equalTo(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addNotEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`notEqual_${conditionPropKey}`)) {
      const value = conditions.get(`notEqual_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.notEqualTo(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addLessThanToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`lessThan_${conditionPropKey}`)) {
      const value = conditions.get(`lessThan_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.lessThan(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addLessThanOrEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`lessThanOrEqualTo_${conditionPropKey}`)) {
      const value = conditions.get(`lessThanOrEqualTo_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.lessThanOrEqualTo(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addGreaterThanToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`greaterThan_${conditionPropKey}`)) {
      const value = conditions.get(`greaterThan_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.greaterThan(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addGreaterThanOrEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`greaterThanOrEqualTo_${conditionPropKey}`)) {
      const value = conditions.get(`greaterThanOrEqualTo_${conditionPropKey}`);

      if (typeof value !== 'undefined') {
        query.greaterThanOrEqualTo(columnName, value);

        return true;
      }
    }

    return false;
  };

  static addIncludeQuery = (criteria, query, columnName) => {
    if (criteria.has(`include_${columnName}`)) {
      const value = criteria.get(`include_${columnName}`);

      if (typeof value !== 'undefined') {
        query.include(columnName);

        return true;
      }
    }

    return false;
  };

  static addExistenceQuery = (conditions, query, columnName) => {
    if (conditions.has(`exist_${columnName}`)) {
      const value = conditions.get(`exists_${columnName}`);

      if (typeof value !== 'undefined') {
        query.exists(columnName);

        return true;
      }
    }

    if (conditions.has(`doesNotExist_${columnName}`)) {
      const value = conditions.get(`doesNotExist_${columnName}`);

      if (typeof value !== 'undefined') {
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
