import { Component } from 'react';
import network from '../../network';

class Network extends Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
    this.setRequests = this.setRequests.bind(this);
  }

  componentDidMount() {
    network.listen(this.setRequests);
  }

  componentWillUnmount() {
    network.unlisten(this.setRequests);
  }

  setRequests(requests) {
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
