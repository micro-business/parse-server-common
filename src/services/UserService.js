// @flow

import { Map } from 'immutable';
import ParseWrapperService from './ParseWrapperService';
import Exception from './Exception';

export default class UserService {
  static signUpWithUsernameAndPassword = async (username: string, password: string, emailAddress: ?string) => {
    const user = ParseWrapperService.createNewUser();

    user.setUsername(username);
    user.setPassword(password);

    if (emailAddress) {
      user.setEmail(emailAddress);
    }

    const result = await user.signUp();

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      emailAddressVerified: result.get('emailVerified'),
    });
  };

  static signInWithUsernameAndPassword = async (username: string, password: string) => {
    const result = await ParseWrapperService.logIn(username, password);

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      emailAddressVerified: result.get('emailVerified'),
    });
  };

  static signOut = () => ParseWrapperService.logOut();

  static sendEmailVerification = async () => {
    const user = await ParseWrapperService.getCurrentUserAsync();

    // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
    user.setEmail(user.getEmail());

    return user.save();
  };

  static resetPassword = async (emailAddress: string) => {
    const user = await ParseWrapperService.getCurrentUserAsync();

    return user.requestPasswordReset(emailAddress);
  };

  static updatePassword = async (newPassword: string) => {
    const user = await ParseWrapperService.getCurrentUserAsync();

    user.setPassword(newPassword);

    return user.save();
  };

  static getCurrentUserInfo = async () => {
    const user = await ParseWrapperService.getCurrentUserAsync();

    return Map({
      id: user.id,
      username: user.getUsername(),
      emailAddress: user.getEmail(),
      emailAddressVerified: user.get('emailVerified'),
    });
  };

  static getUserInfo = async (username: string) => {
    const results = await ParseWrapperService.createUserQuery().equalTo('username', username).find();

    if (results.length === 0) {
      throw new Exception(`No user found with username: ${username}`);
    } else if (results.length > 1) {
      throw new Exception(`Multiple user found with username: ${username}`);
    } else {
      return Map({
        id: results[0].id,
        username: results[0].getUsername(),
      });
    }
  };
}
