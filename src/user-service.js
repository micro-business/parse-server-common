// @flow

import {
  Map,
} from 'immutable';
import {
  ParseWrapperService,
} from './parse-wrapper-service';

class UserService {
  static signUpWithEmailAndPassword(username: string, password: string, emailAddress: ? string) {
    return new Promise((resolve, reject) => {
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
    });
  }

  static signInWithEmailAndPassword(username: string, password: string) {
    return new Promise((resolve, reject) => {
      ParseWrapperService.logIn(username, password)
        .then(result => resolve(Map({
          id: result.id,
          username: result.getUsername(),
          emailAddress: result.getEmail(),
          emailAddressVerified: result.get('emailVerified'),
        })))
        .catch(error => reject(error));
    });
  }

  static signOut() {
    return ParseWrapperService.logOut();
  }

  static sendEmailVerification() {
    const user = ParseWrapperService.getCurrentUser();

    // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
    user.setEmail(user.getEmail());

    return user.save();
  }

  static resetPassword(emailAddress: string) {
    return ParseWrapperService.getCurrentUser()
      .requestPasswordReset(emailAddress);
  }

  static updatePassword(newPassword: string) {
    const user = ParseWrapperService.getCurrentUser();

    user.setPassword(newPassword);

    return user.save();
  }

  static getUserInfo(username: string) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createUserQuery();

      query.equalTo('username', username);

      query.find()
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
    });
  }
}

export {
  UserService,
};

export default UserService;
