import Parse from 'parse/node';

class ParseWrapperService {
  static createQuery(object) {
    return new Parse.Query(object);
  }

  static getConfig() {
    return Parse.Config.get();
  }

  static getCahedConfig() {
    return Parse.Config.current();
  }
}

export {
  ParseWrapperService,
};

export default ParseWrapperService;
