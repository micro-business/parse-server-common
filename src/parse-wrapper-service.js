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
  static createQuery(object) {
    return new Parse.Query(object);
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

  static logIn(emailAddress: string, password: string) {
    return Parse.User.logIn(emailAddress, password);
  }

  static logOut() {
    return Parse.User.logOut();
  }
}

export {
  ParseWrapperService,
};

export default ParseWrapperService;
