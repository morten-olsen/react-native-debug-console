export const createContext = ({
  logProvider,
}, baseContext = {}) => ({
  log: (...args) => logProvider.log(...args),
  clear: logProvider.clear,
  window: baseContext,
  global: baseContext,
  context: baseContext,
});