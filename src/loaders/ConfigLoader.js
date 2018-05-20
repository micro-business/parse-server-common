// @flow

import { Common } from '@microbusiness/common-javascript';
import Immutable from 'immutable';
import Dataloader from 'dataloader';
import { ParseWrapperService } from '../services';

const createConfigLoaderByKey = () =>
  new Dataloader(async keys =>
    Promise.all(
      keys.map(async key => {
        const configs = await ParseWrapperService.getConfig();
        const config = configs.get(key);

        if (Common.isNotUndefined(config)) {
          return Immutable.fromJS(config);
        }

        throw new Error(`Failed to retrieve configuration for key: ${key}`);
      }),
    ),
  );

export default createConfigLoaderByKey;
