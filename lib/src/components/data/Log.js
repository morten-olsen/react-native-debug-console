import { Component } from 'react';
import log from '../../log';

class Log extends Component {
  constructor() {
    super();
    this.state = {
      logs: [],
    };
    this.setLogs = this.setLogs.bind(this);
  }

  componentDidMount() {
    log.listen(this.setLogs);
  }

  componentWillUnmount() {
    log.unlisten(this.setLogs);
  }

  setLogs(logs) {
    this.setState({
      logs,
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

export default Log;
