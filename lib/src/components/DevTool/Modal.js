import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
} from 'react-native';
import events from '../../events';
import DevTool from './index';


class Events extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
    this.listen = this.listen.bind(this);
  }

  componentDidMount() {
    events.listen(this.listen);
  }

  componentWillUnmount() {
    events.unlisten(this.listen);
  }

  listen(type, data) {
    if (type === 'SHOW_DEVTOOLS') {
      return this.setState({
        visible: true,
      });
    }

    if (type === 'HIDE_DEVTOOLS') {
      return this.setState({
        visible: false,
      });
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => {
        }}
      >
        <Fragment>
          <DevTool />
          <Button
            title="close"
            onPress={() => {
              events.publish('HIDE_DEVTOOLS');
            }}
          />
        </Fragment>
      </Modal>
    )
  }
}

export default Events;
