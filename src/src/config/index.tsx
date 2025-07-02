import { Platform } from 'react-native';
import Config from 'react-native-config';

import dev from './dev';
import qa from './qa';
import prod from './prod';

let envConfig;

switch (Config.ENV_NAME) {
  case 'production':
    envConfig = prod;
    break;
  case 'qa':
    envConfig = qa;
    break;
  default:
    envConfig = dev;
}

export default envConfig;
