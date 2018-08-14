import React, { Component } from 'react';

class State extends Component {
  constructor(props, ...others) {
    super(props, ...others);
    this.state = props.initState || {};
    this.setState = this.setState.bind(this);
  }

  render() {
    const { children } = this.props;
    const component = children(
      this.state,
      this.setState,
    );
    return component;
  }
}

export default State;