// @flow

import Parse from 'parse/node';

export default class ParseWrapperService {
  static createQuery = (object, criteria) => ParseWrapperService.addStandardCriteriaToQuery(object, new Parse.Query(object), criteria);

  static addStandardCriteriaToQuery = (object, currentQuery, criteria) => {
    let query = currentQuery;

    if (!criteria) {
      return query;
    }

    if (criteria.has('id')) {
      const objectId = criteria.get('id');

      if (objectId) {
        query.equalTo('objectId', objectId);
      }
    }

    if (criteria.has('ids')) {
      const objectIds = criteria.get('ids');

      if (objectIds && !objectIds.isEmpty()) {
        query = ParseWrapperService.createOrQuery(objectIds.map((objectId) => {
          const objectIdQuery = new Parse.Query(object);

          objectIdQuery.equalTo('objectId', objectId);

          return objectIdQuery;
        }));
      }
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
        query.descending('createdAt').limit(1);
      }
    }

    if (criteria.has('orderByFieldAscending')) {
      const value = criteria.get('orderByFieldAscending');

      if (value) {
        query.ascending(value);
      }
    }

    if (criteria.has('orderByFieldDescending')) {
      const value = criteria.get('orderByFieldDescending');

      if (value) {
        query.descending(value);
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
  };

  static createOrQuery = queries => Parse.Query.or.apply(this, queries.toArray());
  static createUserQuery = () => new Parse.Query(Parse.User);
  static createACL = object => new Parse.ACL(object);
  static createGeoPoint = (arg1, arg2) => new Parse.GeoPoint(arg1, arg2);
  static createSessionQuery = () => new Parse.Query(Parse.Session);
  static getConfig = () => Parse.Config.get();
  static getCachedConfig = () => Parse.Config.current();
  static getCurrentUser = () => Parse.User.current();
  static getCurrentUserAsync = () => Parse.User.currentAsync();
  static createNewUser = ({
    username, password, emailAddress, userType,
  } = {}) => {
    const user = new Parse.User();

    if (username) {
      user.setUsername(username);
    }

    if (password) {
      user.setPassword(password);
    }

    if (emailAddress) {
      user.setEmail(emailAddress);
    }

    if (userType) {
      user.set('userType', userType);
    }

    return user;
  };
  static createUserWithoutData = (userId: string) => Parse.User.createWithoutData(userId);
  static logIn = (username: string, password: string) => Parse.User.logIn(username, password);
  static logInWithFacebook = (scope: string) =>
    new Promise((resolve, reject) => {
      Parse.FacebookUtils.logIn(scope, {
        success: resolve,
        error: (user, error) => reject((error && error.error) || error),
      });
    });
  static logOut = () =>
    new Promise((resolve, reject) => {
      Parse.User
        .logOut()
        .then(() => resolve())
        .catch(error => reject(error));
    });
}
