// @flow

import { Map } from 'immutable';
import ParseWrapperService from './ParseWrapperService';

export default class UserService {
  static signUpWithUsernameAndPassword = async (username: string, password: string, emailAddress: ?string, userType: ?string) => {
    const user = ParseWrapperService.createNewUser({
      username,
      password,
      emailAddress,
      userType,
    });
    const result = await user.signUp();

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      emailAddressVerified: result.get('emailVerified'),
      userType: result.get('userType'),
    });
  };

  static signInWithUsernameAndPassword = async (username: string, password: string) => {
    const result = await ParseWrapperService.logIn(username, password);

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      emailAddressVerified: result.get('emailVerified'),
      userType: result.get('userType'),
    });
  };

  static signOut = () => ParseWrapperService.logOut();

  static sendEmailVerification = async (user) => {
    // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
    user.setEmail(user.getEmail());

    return user.save();
  };

  static resetPassword = async (user, emailAddress: string) => user.requestPasswordReset(emailAddress);

  static updateUserDetails = async ({
    username, password, emailAddress, userType,
  } = {}, user, sessionToken, useMasterKey: ?boolean) => {
    if (username) {
      user.setUsername(username);
    }

    if (password) {
      user.setPassword(password);
    }

    if (emailAddress) {
      user.setEmail(emailAddress);
    }

    if (userType) {
      user.set('userType', userType);
    }

    return user.save(null, { sessionToken, useMasterKey });
  };

  static getUserForProvidedSessionToken = async (sessionToken, useMasterKey: ?boolean) => {
    const result = await ParseWrapperService.createSessionQuery()
      .equalTo('sessionToken', sessionToken)
      .first({ useMasterKey });

    return result ? result.get('user') : null;
  };

  static getUserById = async (id: string, sessionToken: ?string, useMasterKey: ?boolean) => {
    const result = await ParseWrapperService.createUserQuery()
      .equalTo('objectId', id)
      .first({ sessionToken, useMasterKey });

    if (result) {
      return result;
    }

    throw new Error(`No user found with id: ${id}`);
  };

  static getUser = async (username: string, sessionToken: ?string, useMasterKey: ?boolean) => {
    const result = await ParseWrapperService.createUserQuery()
      .equalTo('username', username)
      .first({ sessionToken, useMasterKey });

    if (result) {
      return result;
    }

    throw new Error(`No user found with username: ${username}`);
  };

  static getUserInfo = async (username: string, sessionToken: ?string, useMasterKey: ?boolean) => {
    const result = await UserService.getUser(username, sessionToken, (useMasterKey: ?boolean));

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      userType: result.get('userType'),
      providerEmail: result.get('providerEmail'),
    });
  };

  static getUserInfoById = async (id: string, sessionToken: ?string, useMasterKey: ?boolean) => {
    const result = await UserService.getUserById(id, sessionToken, (useMasterKey: ?boolean));

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      userType: result.get('userType'),
      providerEmail: result.get('providerEmail'),
    });
  };
}
