import Parse from 'parse/node';

class BaseService {
  static createQuery(object) {
    return new Parse.Query(object);
  }
}

export default BaseService;
