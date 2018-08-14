import { Component } from 'react';
import log from '../../log';

class Log extends Component {
  constructor() {
    super();
    this.state = {
      logs: [],
    };
    this.addLog = this.addLog.bind(this);
  }

  componentDidMount() {
    log.listen(this.addLog);
  }

  componentWillUnmount() {
    log.unlisten(this.addLog);
  }

  addLog(entry) {
    entry = Array.isArray(entry) ? entry : [entry];
    const logs = [
      ...this.state.logs,
      ...entry,
    ];
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
