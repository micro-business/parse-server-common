// @flow

import cuid from 'cuid';
import '../../../bootstrap';
import { UserService } from '..';

describe('signUpWithUsernameAndPassword', () => {
  test('should return the new signed up user', async () => {
    const username: string = cuid();
    const emailAddress: string = `${cuid()}@email.com`;
    const result = await UserService.signUpWithUsernameAndPassword(username, cuid(), emailAddress);

    expect(result.get('id')).toBeTruthy();
    expect(result.get('username')).toBe(username);
    expect(result.get('emailAddress')).toBe(emailAddress);
    expect(result.get('emailVerified')).toBeFalsy();
  });
});

describe('signInWithUsernameAndPassword', () => {
  test('should fail if email address does not exist', async () => {
    try {
      const username: string = cuid();
      await UserService.signInWithUsernameAndPassword(username, cuid());
      fail(`User signed in for email that does not exist. Email: ${username}`);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('should fail if password is wrong', async () => {
    try {
      const username: string = cuid();

      await UserService.signUpWithUsernameAndPassword(username, cuid(), `${cuid()}@email.com`);
      await UserService.signInWithUsernameAndPassword(username, cuid());
      fail('User signed in for incorrect password.');
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('should return the signed in user', async () => {
    const username: string = cuid();
    const emailAddress: string = `${cuid()}@email.com`;
    const password: string = cuid();

    await UserService.signUpWithUsernameAndPassword(username, password, emailAddress);

    const result = await UserService.signInWithUsernameAndPassword(username, password);

    expect(result.get('id')).toBeTruthy();
    expect(result.get('username')).toBe(username);
    expect(result.get('emailAddress')).toBe(emailAddress);
    expect(result.get('emailVerified')).toBeFalsy();
  });
});

describe('getUserInfo', () => {
  test('should reject if username does not exist', async () => {
    const username: string = cuid();

    try {
      await UserService.getUserInfo(username);

      fail(`Received user info for use that does not exist. Username: ${username}`);
    } catch (error) {
      expect(error.message).toBe(`No user found with username: ${username}`);
    }
  });

  test('should return the user info', async () => {
    const username: string = cuid();

    await UserService.signUpWithUsernameAndPassword(username, cuid(), `${cuid()}@email.com`);
    const result = await UserService.getUserInfo(username);

    expect(result.get('id')).toBeTruthy();
    expect(result.get('username')).toBe(username);
  });
});
