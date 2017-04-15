import Parse from 'parse/node';

class ParseWrapperService {
  static createQuery(object) {
    return new Parse.Query(object);
  }
}

export default ParseWrapperService;
