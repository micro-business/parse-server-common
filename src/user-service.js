import {
  ParseWrapperService,
} from './parse-wrapper-service';

class UserService {
  static signUpWithEmailAndPassword(emailAddress, password) {
    const user = ParseWrapperService.createNewUser();

    user.set('username', emailAddress);
    user.set('password', password);
    user.set('email', emailAddress);

    return user.signUp();
  }

  static signInWithEmailAndPassword(emailAddress, password) {
    return ParseWrapperService.logIn(emailAddress, password);
  }

  static signOut() {
    return ParseWrapperService.getCurrentUser()
      .logOut();
  }

  static sendEmailVerification() {
    const user = ParseWrapperService.getCurrentUser();

    // Re-saving the email address triggers the logic in parse server back-end to re-send the verification email
    user.set('email', user.getEmail());

    return user.save();
  }

  static resetPassword(emailAddress) {
    return ParseWrapperService.getCurrentUser()
      .requestPasswordReset(emailAddress);
  }

  static updatePassword(newPassword) {
    const user = ParseWrapperService.getCurrentUser();

    user.set('password', newPassword);

    return user.save();
  }
}

export {
  UserService,
};

export default UserService;
