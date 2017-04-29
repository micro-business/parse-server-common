// @flow

import platform from './platform';

let Parse;

if (platform === 'node') {
  Parse = require('parse/node'); // eslint-disable-line global-require
} else if (platform === 'browser') {
  Parse = require('parse'); // eslint-disable-line global-require
} else {
  Parse = require('parse/react-native'); // eslint-disable-line global-require
}

class ParseWrapperService {
  static createUserQuery() {
    return new Parse.Query(Parse.User);
  }

  static createQuery(object, criteria) {
    const query = new Parse.Query(object);

    if (criteria.has('fields') && criteria.get('fields')) {
      const fields = criteria.get('fields');

      if (fields) {
        query.select(fields.toArray());
      }
    }

    return query;
  }

  static getConfig() {
    return Parse.Config.get();
  }

  static getCachedConfig() {
    return Parse.Config.current();
  }

  static getCurrentUser() {
    return Parse.User.current();
  }

  static getCurrentUserAsync() {
    return Parse.User.currentAsync();
  }

  static createNewUser() {
    return new Parse.User();
  }

  static createUserWithoutData(userId: string) {
    return Parse.User.createWithoutData(userId);
  }

  static logIn(username: string, password: string) {
    return Parse.User.logIn(username, password);
  }

  static logOut() {
    return Parse.User.logOut();
  }
}

export {
  ParseWrapperService,
};

export default ParseWrapperService;
