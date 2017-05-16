// @flow

import uuid from 'uuid/v4';
import '../../../bootstrap';
import { UserService } from '../';

describe('signUpWithUsernameAndPassword', () => {
  test('should return the new signed up user', (done) => {
    const username: string = uuid();
    const emailAddress: string = `${uuid()}@email.com`;

    UserService.signUpWithUsernameAndPassword(username, uuid(), emailAddress)
      .then((result) => {
        expect(result.get('id')).toBeTruthy();
        expect(result.get('username')).toBe(username);
        expect(result.get('emailAddress')).toBe(emailAddress);
        expect(result.get('emailVerified')).toBeFalsy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('signInWithUsernameAndPassword', () => {
  test('should fail if email address does not exist', (done) => {
    const username: string = uuid();

    UserService.signInWithUsernameAndPassword(username, uuid())
      .then(() => {
        fail(`User signed in for email that does not exist. Email: ${username}`);
        done();
      })
      .catch(() => done());
  });

  test('should fail if password is wrong', (done) => {
    const username: string = uuid();

    UserService.signUpWithUsernameAndPassword(username, uuid(), `${uuid()}@email.com`)
      .then(() => UserService.signInWithUsernameAndPassword(username, uuid()))
      .then(() => {
        fail('User signed in for incorrect password.');
        done();
      })
      .catch(() => done());
  });

  test('should return the signed in user', (done) => {
    const username: string = uuid();
    const emailAddress: string = `${uuid()}@email.com`;
    const password: string = uuid();

    UserService.signUpWithUsernameAndPassword(username, password, emailAddress)
      .then(() => UserService.signInWithUsernameAndPassword(username, password))
      .then((result) => {
        expect(result.get('id')).toBeTruthy();
        expect(result.get('username')).toBe(username);
        expect(result.get('emailAddress')).toBe(emailAddress);
        expect(result.get('emailVerified')).toBeFalsy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('getUserInfo', () => {
  test('should reject if username does not exist', (done) => {
    const username: string = uuid();

    UserService.getUserInfo(username)
      .then(() => {
        fail(`Received user info for use that does not exist. Username: ${username}`);
        done();
      })
      .catch((error) => {
        expect(error).toBe(`No user found with username: ${username}`);
        done();
      });
  });

  test('should return the user info', (done) => {
    const username: string = uuid();

    UserService.signUpWithUsernameAndPassword(username, uuid(), `${uuid()}@email.com`)
      .then(() => UserService.getUserInfo(username))
      .then((result) => {
        expect(result.get('id')).toBeTruthy();
        expect(result.get('username')).toBe(username);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});
