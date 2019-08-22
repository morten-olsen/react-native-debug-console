const proxied = global.XMLHttpRequest ? global.XMLHttpRequest.prototype.open : () => {};
let currentId = 0;

class Network {
  constructor() {
    this.requests = [];
    this.listeners = [];
    // this.clear = this.clear.bind(this);
    this.get = this.get.bind(this);
  }

  listen(fn) {
    this.listeners.push(fn);
    fn(this.requests);
  }

  get() {
    return this.requests;
  }

  unlisten(fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  clear() {
    this.requests = [];
    this.listeners.forEach(l => l(this.requests));
  }

  addRequest(id, request) {
    const index = this.requests.findIndex(req => req.id === id);
    if (index >= 0) {
      this.requests[index] = {
        id,
        ...request,
      };
    } else {
      this.requests.push({
        id,
        ...request,
      });
    }
    this.listeners.forEach(l => l(this.requests));
  }

  attach() {
    const me = this;
    const headers = {};
    global.XMLHttpRequest.prototype.open = function proxyOpen (...args) {
      let sendArgs;
      const [
        method,
        url,
      ] = args;
      const id = currentId++;
      this.addEventListener('load', () => {
        me.addRequest(id, {
          url,
          method,
          args: sendArgs,
          headers,
          requestHeaders: this.getAllResponseHeaders(),
          contentType: (this.getResponseHeader('content-type') || ''),
          request: this,
          status: this.status || null,
        });
      })
      this.addEventListener('error', (error) => {
        me.addRequest(id, {
          url,
          method,
          error,
          args: sendArgs,
          headers,
          requestHeaders: this.getAllResponseHeaders(),
          request: this,
          status: this.status || 'Error',
        });
      })
      const proxiedSend = this.send;
      const proxiedSetRequestHeader = this.setRequestHeader;
      this.send = function proxySend (...sendargs) {
        sendArgs = sendargs;
        me.addRequest(id, {
          url,
          method,
          args: sendArgs,
          headers,
          request: this,
          status: 'Waiting',
        });
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
    global.XMLHttpRequest.prototype.open = proxied;
  }
}

const network = new Network();

export default network;
