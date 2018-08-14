/* const overrides = [
  'log',
];

const proxies = overrides.reduce((output, key) => ({
  ...output,
  [key]: window.console[key],
}), {}); */

const proxyConsole = window.console;

class Log {
  constructor() {
    this.logs = [];
    this.listeners = [];
  }

  listen(fn) {
    this.listeners.push(fn);
    fn(this.logs);
  }

  unlisten(fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  log(type, data) {
    const entry = {
      type,
      data,
    };
    this.logs.push(entry);
    this.listeners.forEach(l => l(entry));
  }

  info(data) {
    this.log('info', data);
  }

  error(error) {
    this.log('error', error);
  }

  warn(data) {
    this.log('warn', data);
  }

  debug(data) {
    this.log('debug', data);
  }

  attach(keep) {
    window.console = {
      error: (...data) => this.error(...data),
      warn: (data) => this.warn(data),
      info: (data) => this.info(data),
      log: (data) => this.info(data),
      debug: (data) => this.debug(data),
    };
    ErrorUtils.setGlobalHandler((err, fatal) => {
      this.error(err);
    });
  }

  detach() {
    overrides.forEach((key) => {
      window.console[key] = proxies[key];
    });
  }
}

const log = new Log();

export default log;
