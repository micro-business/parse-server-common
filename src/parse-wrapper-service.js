// @flow

import {
  List,
} from 'immutable';
import platform from './platform';

let Parse;

if (platform === 'node') {
  Parse = require('parse/node'); // eslint-disable-line global-require
} else if (platform === 'browser') {
  Parse = require('parse'); // eslint-disable-line global-require
} else {
  Parse = require('parse/react-native'); // eslint-disable-line global-require
}

export default class ParseWrapperService {
  static createQuery = (object, criteria) => {
    const query = new Parse.Query(object);

    if (!criteria) {
      return query;
    }

    if (criteria.has('limit')) {
      const value = criteria.get('limit');

      if (value) {
        query.limit(value);
      }
    }

    if (criteria.has('skip')) {
      const value = criteria.get('skip');

      if (value) {
        query.skip(value);
      }
    }

    if (criteria.has('topMost')) {
      const value = criteria.get('topMost');

      if (value) {
        query.descending('createdAt')
          .limit(1);
      }
    }

    if (criteria.has('field')) {
      const field = criteria.get('field');

      if (field) {
        query.select([field]);
      }
    }

    if (criteria.has('fields')) {
      const fields = criteria.get('fields');

      if (fields) {
        query.select(fields.toArray());
      }
    }

    if (criteria.has('inlcludeField')) {
      const field = criteria.get('inlcludeField');

      if (field) {
        query.include(field);
      }
    }

    if (criteria.has('inlcludeFields')) {
      const fields = criteria.get('inlcludeFields');

      if (fields) {
        fields.forEach(field => query.include(field));
      }
    }

    if (criteria.has('ascending')) {
      const value = criteria.get('ascending');

      if (value) {
        query.ascending(value);
      }
    }

    if (criteria.has('descending')) {
      const value = criteria.get('descending');

      if (value) {
        query.descending(value);
      }
    }

    return query;
  }

  static createQueryIncludingObjectIds = (object, query, criteria) => {
    if (!criteria) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (!conditions) {
      return query;
    }

    if (conditions.has('id')) {
      const objectId = conditions.get('id');

      if (objectId) {
        const objectIdQuery = new Parse.Query(object);

        objectIdQuery.equalTo('objectId', objectId);

        return ParseWrapperService.createOrQuery(List.of(objectIdQuery, query));
      }
    }

    if (conditions.has('ids')) {
      const objectIds = conditions.get('ids');

      if (objectIds && !objectIds.isEmpty()) {
        return ParseWrapperService.createOrQuery(objectIds.map((objectId) => {
          const objectIdQuery = new Parse.Query(object);

          objectIdQuery.equalTo('objectId', objectId);

          return objectIdQuery;
        })
          .push(query));
      }
    }

    return query;
  }

  static createOrQuery = queries => Parse.Query.or.apply(this, queries.toArray())
  static createUserQuery = () => new Parse.Query(Parse.User)
  static getConfig = () => Parse.Config.get()
  static getCachedConfig = () => Parse.Config.current()
  static getCurrentUser = () => Parse.User.current()
  static getCurrentUserAsync = () => Parse.User.currentAsync()
  static createNewUser = () => new Parse.User()
  static createUserWithoutData = (userId: string) => Parse.User.createWithoutData(userId)
  static logIn = (username: string, password: string) => Parse.User.logIn(username, password)
  static logOut = () => Parse.User.logOut()
}
