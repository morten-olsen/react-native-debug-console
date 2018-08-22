import log from './log';
import { AsyncStorage } from 'react-native';

export const context = {
  storage: AsyncStorage,
  log: (...args) => console.log(...args),
  clear: log.clear,
};