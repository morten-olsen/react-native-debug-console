import log from './log';
import AsyncStorage from '@react-native-community/async-storage';

export const context = {
  storage: AsyncStorage,
  log: (...args) => console.log(...args),
  clear: log.clear,
};