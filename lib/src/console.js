export const createContext = ({
  logProvider,
}) => ({
  log: (...args) => logProvider.log(...args),
  clear: logProvider.clear,
});