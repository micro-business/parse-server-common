import isNode from 'detect-node';

let Parse;

if (isNode) {
  Parse = require('parse/node'); // eslint-disable-line global-require
} else if (typeof window !== 'undefined') {
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
}

export {
  ParseWrapperService,
};

export default ParseWrapperService;
