// @flow

import { Common } from '@microbusiness/common-javascript';
import Immutable from 'immutable';
import { NewSearchResultReceivedEvent } from '../extensions';
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

      if (Common.isNotUndefined(value)) {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())}$`));
        } else {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}$`));
        }
      }
    }

    if (conditions.has(`startsWith_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())}`));
        } else {
          query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}`));
        }
      }
    }

    if (conditions.has(`endsWith_${conditionPropKey}`)) {
      const value = conditions.get(`endsWith_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())}$`));
        } else {
          query.matches(columnName, new RegExp(`${ServiceBase.escapeTextToUseInRegex(value)}$`));
        }
      }
    }

    if (conditions.has(`contains_${conditionPropKey}`)) {
      const value = conditions.get(`contains_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        if (columnName.endsWith('LowerCase')) {
          query.matches(columnName, new RegExp(`(?=.*${ServiceBase.escapeTextToUseInRegex(value.toLowerCase())})`));
        } else {
          query.matches(columnName, new RegExp(`(?=.*${ServiceBase.escapeTextToUseInRegex(value)})`));
        }
      }
    }

    if (conditions.has(`contains_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_${conditionPropKey}s`);

      if (Common.isNotUndefined(values) && !values.isEmpty()) {
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
      }
    }

    if (conditions.has(`ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(conditionPropKey);

      if (Common.isNotUndefined(value)) {
        query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}$`, 'i'));
      }
    }

    if (conditions.has(`startsWith_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_ignoreCase_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.matches(columnName, new RegExp(`^${ServiceBase.escapeTextToUseInRegex(value)}`, 'i'));
      }
    }

    if (conditions.has(`endsWith_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`endsWith_ignoreCase_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.matches(columnName, new RegExp(`${ServiceBase.escapeTextToUseInRegex(value)}$`, 'i'));
      }
    }

    if (conditions.has(`contains_ignoreCase_${conditionPropKey}`)) {
      const value = conditions.get(`contains_ignoreCase_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.matches(columnName, new RegExp(`(?=.*${ServiceBase.escapeTextToUseInRegex(value)})`, 'i'));
      }
    }

    if (conditions.has(`contains_ignoreCase_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_ignoreCase_${conditionPropKey}s`);

      if (Common.isNotUndefined(values) && !values.isEmpty()) {
        query.matches(
          columnName,
          new RegExp(values.map(value => `(?=.*${ServiceBase.escapeTextToUseInRegex(value)})`).reduce((reduction, value) => reduction + value)),
          'i',
        );
      }
    }
  };

  static addMultiLanguagesStringQuery = (conditions, query, conditionPropKey, columnName, language) =>
    ServiceBase.addStringQuery(conditions, query, conditionPropKey, `${language}_${columnName}`);

  static addGeoLocationQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`near_${conditionPropKey}`)) {
      const value = conditions.get(`near_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.near(columnName, value);
      }
    }

    if (conditions.has(`withinGeoBox_${conditionPropKey}`)) {
      const value = conditions.get(`withinGeoBox_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.withinGeoBox(columnName, value.get('southwest'), value.get('northeast'));
      }
    }

    if (conditions.has(`withinMiles_${conditionPropKey}`)) {
      const value = conditions.get(`withinMiles_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.withinMiles(columnName, value.get('point'), value.get('distance'));
      }
    }

    if (conditions.has(`withinKilometers_${conditionPropKey}`)) {
      const value = conditions.get(`withinKilometers_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.withinKilometers(columnName, value.get('point'), value.get('distance'));
      }
    }

    if (conditions.has(`withinRadians_${conditionPropKey}`)) {
      const value = conditions.get(`withinRadians_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.withinRadians(columnName, value.get('point'), value.get('distance'));
      }
    }
  };

  static addDateTimeQuery = (conditions, query, conditionPropKey, columnName) =>
    ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

  static addNumberQuery = (conditions, query, conditionPropKey, columnName) =>
    ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

  static addLinkQuery = (conditions, query, conditionPropKey, columnName, ObjectType) => {
    ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

    if (conditions.has(`${conditionPropKey}Id`)) {
      const value = conditions.get(`${conditionPropKey}Id`);

      if (Common.isNotUndefined(value)) {
        query.equalTo(columnName, ObjectType.createWithoutData(value));
      }
    }

    if (conditions.has(`${conditionPropKey}s`)) {
      const values = conditions.get(`${conditionPropKey}s`);

      if (Common.isNotUndefined(values) && !values.isEmpty()) {
        query.containedIn(columnName, values.toArray());
      }
    }

    if (conditions.has(`${conditionPropKey}Ids`)) {
      const values = conditions.get(`${conditionPropKey}Ids`);

      if (Common.isNotUndefined(values) && !values.isEmpty()) {
        query.containedIn(columnName, values.map(id => ObjectType.createWithoutData(id)).toArray());
      }
    }
  };

  static addUserLinkQuery = (conditions, query, conditionPropKey, columnName) => {
    ServiceBase.addEqualityQuery(conditions, query, conditionPropKey, columnName);

    if (conditions.has(`${conditionPropKey}Id`)) {
      const value = conditions.get(`${conditionPropKey}Id`);

      if (Common.isNotUndefined(value)) {
        query.equalTo(columnName, ParseWrapperService.createUserWithoutData(value));
      }
    }

    if (conditions.has(`${conditionPropKey}s`)) {
      const values = conditions.get(`${conditionPropKey}s`);

      if (Common.isNotUndefined(values) && !values.isEmpty()) {
        query.containedIn(columnName, values.toArray());
      }
    }

    if (conditions.has(`${conditionPropKey}Ids`)) {
      const values = conditions.get(`${conditionPropKey}Ids`);

      if (Common.isNotUndefined(values) && !values.isEmpty()) {
        query.containedIn(columnName, values.map(id => ParseWrapperService.createUserWithoutData(id)).toArray());
      }
    }
  };

  static addEqualityQuery = (conditions, query, conditionPropKey, columnName) => {
    ServiceBase.addEqualToQuery(conditions, query, conditionPropKey, columnName);
    ServiceBase.addNotEqualToQuery(conditions, query, conditionPropKey, columnName);
    ServiceBase.addLessThanToQuery(conditions, query, conditionPropKey, columnName);
    ServiceBase.addLessThanOrEqualToQuery(conditions, query, conditionPropKey, columnName);
    ServiceBase.addGreaterThanToQuery(conditions, query, conditionPropKey, columnName);
    ServiceBase.addGreaterThanOrEqualToQuery(conditions, query, conditionPropKey, columnName);
  };

  static addEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(conditionPropKey)) {
      const value = conditions.get(conditionPropKey);

      if (Common.isNotUndefined(value)) {
        query.equalTo(columnName, value);
      }
    }
  };

  static addNotEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`notEqual_${conditionPropKey}`)) {
      const value = conditions.get(`notEqual_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.notEqualTo(columnName, value);
      }
    }
  };

  static addLessThanToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`lessThan_${conditionPropKey}`)) {
      const value = conditions.get(`lessThan_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.lessThan(columnName, value);
      }
    }
  };

  static addLessThanOrEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`lessThanOrEqualTo_${conditionPropKey}`)) {
      const value = conditions.get(`lessThanOrEqualTo_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.lessThanOrEqualTo(columnName, value);
      }
    }
  };

  static addGreaterThanToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`greaterThan_${conditionPropKey}`)) {
      const value = conditions.get(`greaterThan_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.greaterThan(columnName, value);
      }
    }
  };

  static addGreaterThanOrEqualToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(`greaterThanOrEqualTo_${conditionPropKey}`)) {
      const value = conditions.get(`greaterThanOrEqualTo_${conditionPropKey}`);

      if (Common.isNotUndefined(value)) {
        query.greaterThanOrEqualTo(columnName, value);
      }
    }
  };

  static addIncludeQuery = (criteria, query, columnName) => {
    if (criteria.has(`include_${columnName}`)) {
      const value = criteria.get(`include_${columnName}`);

      if (Common.isNotUndefined(value)) {
        query.include(columnName);
      }
    }
  };

  static addExistenceQuery = (conditions, query, columnName) => {
    if (conditions.has(`exist_${columnName}`)) {
      const value = conditions.get(`exists_${columnName}`);

      if (Common.isNotUndefined(value)) {
        query.exists(columnName);
      }
    }

    if (conditions.has(`doesNotExist_${columnName}`)) {
      const value = conditions.get(`doesNotExist_${columnName}`);

      if (Common.isNotUndefined(value)) {
        query.doesNotExist(columnName);
      }
    }
  };

  constructor(ObjectType, buildSearchQueryFunc, buildIncludeQueryFunc, objectFriendlyName) {
    this.ObjectType = ObjectType;
    this.buildSearchQueryFunc = buildSearchQueryFunc;
    this.buildIncludeQueryFunc = buildIncludeQueryFunc;
    this.messagePrefix = `No ${objectFriendlyName} found with Id: `;
  }

  create = async (info, acl, sessionToken, useMasterKey) => {
    const object = this.ObjectType.spawn(info);

    ServiceBase.setACL(object, acl);

    const result = await object.save(null, { sessionToken, useMasterKey });

    return result.id;
  };

  read = async (id, criteria, sessionToken, useMasterKey) => {
    const query = ParseWrapperService.createQuery(this.ObjectType).equalTo('objectId', id);
    const finalQuery = this.buildIncludeQueryFunc ? this.buildIncludeQueryFunc(query, criteria) : query;
    const result = await finalQuery.first({ sessionToken, useMasterKey });

    if (result) {
      return new this.ObjectType(result).getInfo();
    }

    throw new Error(this.messagePrefix + id);
  };

  update = async (info, sessionToken, useMasterKey) => {
    const result = await ParseWrapperService.createQuery(this.ObjectType)
      .equalTo('objectId', info.get('id'))
      .first({ sessionToken });

    if (result) {
      const object = new this.ObjectType(result);

      await object.updateInfo(info).saveObject(sessionToken, useMasterKey);

      return object.getId();
    }

    throw new Error(this.messagePrefix + info.get('id'));
  };

  delete = async (id, sessionToken, useMasterKey) => {
    const result = await ParseWrapperService.createQuery(this.ObjectType)
      .equalTo('objectId', id)
      .first({ sessionToken });

    if (!result) {
      throw new Error(this.messagePrefix + id);
    }

    await result.destroy({ sessionToken, useMasterKey });
  };

  search = async (criteria, sessionToken, useMasterKey) => {
    const results = await this.buildSearchQueryFunc(criteria).find({ sessionToken, useMasterKey });

    return Immutable.fromJS(results).map(result => new this.ObjectType(result).getInfo());
  };

  searchAll = (criteria, sessionToken, useMasterKey) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = this.buildSearchQueryFunc(criteria).each(result => event.raise(new this.ObjectType(result).getInfo()), {
      sessionToken,
      useMasterKey,
    });

    return {
      event,
      promise,
    };
  };

  count = async (criteria, sessionToken, useMasterKey) => this.buildSearchQueryFunc(criteria).count({ sessionToken, useMasterKey });

  exists = async (criteria, sessionToken, useMasterKey) => (await this.count(criteria, sessionToken, useMasterKey)) > 0;
}
