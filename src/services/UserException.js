// @flow

export default class UserException {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }

  getErrorMessage = () => this.errorMessage;
}
