export const proxyConsole = window.console;

class Log {
  constructor() {
    this.logs = [];
    this.listeners = [];
    this.clear = this.clear.bind(this);
    this.get = this.get.bind(this);
  }

  listen(fn) {
    this.listeners.push(fn);
    fn(this.logs);
  }

  unlisten(fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  clear() {
    this.logs = [];
    this.listeners.forEach(l => l(this.logs));
  }

  get() {
    return this.logs;
  }

  log(type, data, keep) {
    if (data && data[0] && data[0].indexOf && data[0].indexOf('Warning: Using the "className" prop on') === 0) {
      return;
    }
    const entry = {
      type,
      data,
    };
    this.logs.push(entry);
    this.listeners.forEach(l => l(this.logs));
    if (keep) {
      proxyConsole[type](...data);
    }
  }

  info(data, keep) {
    this.log('info', data, keep);
  }

  error(data, keep) {
    this.log('error', data, keep);
  }

  warn(data, keep) {
    this.log('warn', data, keep);
  }

  debug(data, keep) {
    this.log('debug', data, keep);
  }

  attach(keep) {
    const redirected = Object.keys(proxyConsole).reduce((output, key) => ({
      ...output,
      [key]: keep ? (...args) => proxyConsole[key](...args) : () => {},
    }), {});
    window.console = {
      ...redirected,
      error: (...data) => this.error(data, keep),
      warn: (...data) => this.warn(data, keep),
      info: (...data) => this.info(data, keep),
      log: (...data) => this.info(data, keep),
      debug: (...data) => this.debug(data, keep),
      verbose: (...data) => this.debug(data, keep),
    };
    if (global.ErrorUtils) {
      global.ErrorUtils.setGlobalHandler((err, fatal) => {
        this.error([err], keep);
      });
    }
  }

  detach() {
    overrides.forEach((key) => {
      window.console[key] = proxies[key];
    });
  }
}

const log = new Log();

export default log;
