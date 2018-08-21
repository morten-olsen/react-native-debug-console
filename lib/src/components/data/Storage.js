import { Component } from 'react';
import { AsyncStorage } from 'react-native';

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
    await AsyncStorage.removeItem(name);
    await this.update();
  }

  async clear() {
    await AsyncStorage.clear();
    await this.update();
  }

  async update() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await Promise.all(keys.map(key => AsyncStorage.getItem(key)));
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
