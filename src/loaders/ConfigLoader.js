// @flow

import Immutable from 'immutable';
import Dataloader from 'dataloader';
import { ParseWrapperService } from '../services';

const createConfigLoader = () =>
  new Dataloader(async keys =>
    Promise.all(keys.map(async (key) => {
      const configs = await ParseWrapperService.getConfig();
      const config = configs.get(key);

      if (config) {
        return Immutable.fromJS(config);
      }

      throw new Error(`Failed to retrieve configuration for key: ${key}`);
    })));

export default createConfigLoader;
