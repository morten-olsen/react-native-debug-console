const proxied = window.XMLHttpRequest.prototype.open;

class Network {
  constructor() {
    this.requests = [];
    this.listeners = [];
  }

  listen(fn) {
    this.listeners.push(fn);
    fn(this.requests);
  }

  unlisten(fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  addRequest(request) {
    this.requests.push(request);
    this.listeners.forEach(l => l(request));
  }

  attach() {
    const me = this;
    window.XMLHttpRequest.prototype.open = function proxyOpen (...args) {
      let sendArgs;
      const [
        method,
        url,
      ] = args;
      this.addEventListener('load', () => {
        me.addRequest({
          url,
          method,
          args: sendArgs,
          request: this,
          status: this.status,
        });
      })
      this.addEventListener('error', (error) => {
        me.addRequest({
          url,
          method,
          error,
          args: sendArgs,
          request: this,
          status: this.status || 'CONN ERR',
        });
      })
      const proxiedSend = this.send;
      this.send = function proxySend (...sendargs) {
        sendArgs = sendargs;
        return proxiedSend.apply(this, [].slice.call(arguments));
      }
      return proxied.apply(this, [].slice.call(arguments));
    };
  }

  detach() {
    window.XMLHttpRequest.prototype.open = proxied;
  }
}

const network = new Network();

export default network;
