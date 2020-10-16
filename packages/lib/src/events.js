class Events {
  constructor() {
    this.listeners = [];
  }

  listen(fn) {
    this.listeners.push(fn);
  }

  unlisten(fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  publish(type, data) {
    this.listeners.forEach(l => l(type, data));
  }
}

const events = new Events();

export default events;
