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

  static updateUserDetails = async ({
    username, password, emailAddress, userType,
  } = {}, user, sessionToken, useMasterKey) => {
    const finalUser = user || (await ParseWrapperService.getCurrentUserAsync());

    if (username) {
      finalUser.setUsername(username);
    }

    if (password) {
      finalUser.setPassword(password);
    }

    if (emailAddress) {
      finalUser.setEmail(emailAddress);
    }

    if (userType) {
      finalUser.set('userType', userType);
    }

    return finalUser.save(null, { sessionToken, useMasterKey });
  };

  static getCurrentUserInfo = async () => {
    const user = await ParseWrapperService.getCurrentUserAsync();

    if (user) {
      return Map({
        id: user.id,
        username: user.getUsername(),
        emailAddress: user.getEmail(),
        emailAddressVerified: user.get('emailVerified'),
        userType: user.get('userType'),
      });
    }

    return undefined;
  };

  static getCurrentUserSession = async () => {
    const user = await ParseWrapperService.getCurrentUserAsync();

    return user ? user.getSessionToken() : null;
  };

  static getUserForProvidedSessionToken = async (sessionToken, useMasterKey) => {
    const result = await ParseWrapperService.createSessionQuery()
      .equalTo('sessionToken', sessionToken)
      .first({ useMasterKey });

    return result ? result.get('user') : null;
  };

  static getUserById = async (id: string, sessionToken: ?string, useMasterKey) => {
    const result = await ParseWrapperService.createUserQuery()
      .equalTo('objectId', id)
      .first({ sessionToken, useMasterKey });

    if (result) {
      return result;
    }

    throw new Error(`No user found with id: ${id}`);
  };

  static getUser = async (username: string, sessionToken: ?string, useMasterKey) => {
    const result = await ParseWrapperService.createUserQuery()
      .equalTo('username', username)
      .first({ sessionToken, useMasterKey });

    if (result) {
      return result;
    }

    throw new Error(`No user found with username: ${username}`);
  };

  static getUserInfo = async (username: string, sessionToken: ?string, useMasterKey) => {
    const result = await UserService.getUser(username, sessionToken, useMasterKey);

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      userType: result.get('userType'),
      providerEmail: result.get('providerEmail'),
    });
  };

  static getUserInfoById = async (id: string, sessionToken: ?string, useMasterKey) => {
    const result = await UserService.getUserById(id, sessionToken, useMasterKey);

    return Map({
      id: result.id,
      username: result.getUsername(),
      emailAddress: result.getEmail(),
      userType: result.get('userType'),
      providerEmail: result.get('providerEmail'),
    });
  };
}
