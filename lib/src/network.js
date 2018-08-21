const proxied = window.XMLHttpRequest.prototype.open;

class Network {
  constructor() {
    this.requests = [];
    this.listeners = [];
    this.currentId = 0;
  }

  listen(fn) {
    this.listeners.push(fn);
    fn(this.requests);
  }

  unlisten(fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  clear() {
    this.requests = [];
    this.listeners.forEach(l => l(this.requests));
  }

  addRequest(request) {
    this.requests.push({
      id: this.currentId++,
      ...request,
    });
    this.listeners.forEach(l => l(this.requests));
  }

  attach() {
    const me = this;
    const headers = {};
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
          headers,
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
          headers,
          request: this,
          status: this.status || 'CONN ERR',
        });
      })
      const proxiedSend = this.send;
      const proxiedSetRequestHeader = this.setRequestHeader;
      this.send = function proxySend (...sendargs) {
        sendArgs = sendargs;
        return proxiedSend.apply(this, [].slice.call(arguments));
      }
      this.setRequestHeader = function (name, value) {
        headers[name] = value;
        return proxiedSetRequestHeader.apply(this, [].slice.call(arguments));
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
