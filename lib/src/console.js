import log from './log';

export const context = {
  log: (...args) => console.log(...args),
  clear: log.clear,
};