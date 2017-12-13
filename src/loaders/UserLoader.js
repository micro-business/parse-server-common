// @flow

import Dataloader from 'dataloader';
import { UserService } from '../services';

const createUserLoaderBySessionToken = () =>
  new Dataloader(async sessionTokens =>
    Promise.all(sessionTokens.map(async sessionToken => UserService.getUserForProvidedSessionToken(sessionToken))));

export default createUserLoaderBySessionToken;
