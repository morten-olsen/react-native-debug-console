import { Component } from 'react';
import network from '../../network';

class Network extends Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
    this.addRequest = this.addRequest.bind(this);
  }

  componentDidMount() {
    network.listen(this.addRequest);
  }

  componentWillUnmount() {
    network.unlisten(this.addRequest);
  }

  addRequest(request) {
    request = Array.isArray(request) ? request : [request];
    const requests = [
      ...this.state.requests,
      ...request,
    ];
    this.setState({
      requests,
    });
  }

  render() {
    const {
      children,
    } = this.props;
    const component = children(
      this.state,
    );
    return component;
  }
}

export default Network;
