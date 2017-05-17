// @flow

import uuid from 'uuid/v4';
import '../../../bootstrap';
import { UserService } from '../';

describe('signUpWithUsernameAndPassword', () => {
  test('should return the new signed up user', async () => {
    try {
      const username: string = uuid();
      const emailAddress: string = `${uuid()}@email.com`;
      const result = await UserService.signUpWithUsernameAndPassword(username, uuid(), emailAddress);

      expect(result.get('id')).toBeTruthy();
      expect(result.get('username')).toBe(username);
      expect(result.get('emailAddress')).toBe(emailAddress);
      expect(result.get('emailVerified')).toBeFalsy();
    } catch (error) {
      fail(error);
    }
  });
});

describe('signInWithUsernameAndPassword', () => {
  test('should fail if email address does not exist', async () => {
    try {
      const username: string = uuid();
      await UserService.signInWithUsernameAndPassword(username, uuid());
      fail(`User signed in for email that does not exist. Email: ${username}`);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('should fail if password is wrong', async () => {
    try {
      const username: string = uuid();

      await UserService.signUpWithUsernameAndPassword(username, uuid(), `${uuid()}@email.com`);
      await UserService.signInWithUsernameAndPassword(username, uuid());
      fail('User signed in for incorrect password.');
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('should return the signed in user', async () => {
    try {
      const username: string = uuid();
      const emailAddress: string = `${uuid()}@email.com`;
      const password: string = uuid();

      await UserService.signUpWithUsernameAndPassword(username, password, emailAddress);

      const result = await UserService.signInWithUsernameAndPassword(username, password);

      expect(result.get('id')).toBeTruthy();
      expect(result.get('username')).toBe(username);
      expect(result.get('emailAddress')).toBe(emailAddress);
      expect(result.get('emailVerified')).toBeFalsy();
    } catch (error) {
      fail(error);
    }
  });
});

describe('getUserInfo', () => {
  test('should reject if username does not exist', async () => {
    const username: string = uuid();

    try {
      await UserService.getUserInfo(username);

      fail(`Received user info for use that does not exist. Username: ${username}`);
    } catch (error) {
      expect(error.getErrorMessage()).toBe(`No user found with username: ${username}`);
    }
  });

  test('should return the user info', async () => {
    const username: string = uuid();

    try {
      await UserService.signUpWithUsernameAndPassword(username, uuid(), `${uuid()}@email.com`);
      const result = await UserService.getUserInfo(username);

      expect(result.get('id')).toBeTruthy();
      expect(result.get('username')).toBe(username);
    } catch (error) {
      fail(error);
    }
  });
});
