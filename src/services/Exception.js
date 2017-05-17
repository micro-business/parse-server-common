// @flow

export default class Exception {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }

  getErrorMessage = () => this.errorMessage;
}
