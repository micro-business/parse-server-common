import {
  BaseObject,
} from './base-object';

class User extends BaseObject {
  constructor(object) {
    super(object, '_User');

    this.getInfo = this.getInfo.bind(this);
  }

  getInfo() {
    return Map({
      id: this.getId(),
    });
  }
}

export {
  User,
};

export default User;
