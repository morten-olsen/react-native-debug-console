import { Component } from 'react';

class Storage extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
    this.update = this.update.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  async removeItem(name) {
    await this.props.provider.removeItem(name);
    await this.update();
  }

  async clear() {
    await this.props.provider.clear();
    await this.update();
  }

  async update() {
    try {
      const keys = await this.props.provider.getAllKeys();
      const values = await Promise.all(keys.map(key => this.props.provider.getItem(key)));
      const data = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        data[key] = value;
      }
      this.setState({
        data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      children,
    } = this.props;
    const {
      data,
    } = this.state;
    return children(data, this.update, this.removeItem, this.clear);
  }
}

export default Storage;
