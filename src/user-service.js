// @flow

import {
  Map,
} from 'immutable';
import ParseWrapperService from './parse-wrapper-service';

export default class UserService {
  static signUpWithEmailAndPassword = (username: string, password: string, emailAddress: ? string) => new Promise((resolve, reject) => {
    const user = ParseWrapperService.createNewUser();

    user.setUsername(username);
    user.setPassword(password);

    if (emailAddress) {
      user.setEmail(emailAddress);
    }

    user.signUp()
      .then(result => resolve(Map({
        id: result.id,
        username: result.getUsername(),
        emailAddress: result.getEmail(),
        emailAddressVerified: result.get('emailVerified'),
      })))
      .catch(error => reject(error));
  })

  static signInWithEmailAndPassword = (username: string, password: string) => new Promise((resolve, reject) => {
    ParseWrapperService.logIn(username, password)
      .then(result => resolve(Map({
        id: result.id,
        username: result.getUsername(),
        emailAddress: result.getEmail(),
        emailAddressVerified: result.get('emailVerified'),
      })))
      .catch(error => reject(error));
  })

  static signOut = () => ParseWrapperService.logOut()

  static sendEmailVerification = () => {
    ParseWrapperService.getCurrentUserAsync()
      .then((user) => {
        // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
        user.setEmail(user.getEmail());

        return user.save();
      });
  }

  static resetPassword = (emailAddress: string) => {
    ParseWrapperService.getCurrentUserAsync()
      .then(user => user.requestPasswordReset(emailAddress));
  }

  static updatePassword = (newPassword: string) => {
    ParseWrapperService.getCurrentUserAsync()
      .then((user) => {
        user.setPassword(newPassword);

        return user.save();
      });
  }

  static getCurrentUserInfo = () => new Promise((resolve, reject) => {
    ParseWrapperService.getCurrentUserAsync()
      .then(user => resolve(Map({
        id: user.id,
        username: user.getUsername(),
        emailAddress: user.getEmail(),
        emailAddressVerified: user.get('emailVerified'),
      })))
      .catch(error => reject(error));
  })

  static getUserInfo = (username: string) => new Promise((resolve, reject) => {
    ParseWrapperService.createUserQuery()
      .equalTo('username', username)
      .find()
      .then((results) => {
        if (results.length === 0) {
          reject(`No user found with username: ${username}`);
        } else if (results.length > 1) {
          reject(`Multiple user found with username: ${username}`);
        } else {
          resolve(Map({
            id: results[0].id,
            username: results[0].getUsername(),
          }));
        }
      })
      .catch(error => reject(error));
  })
}
