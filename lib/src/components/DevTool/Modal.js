import React, { Component } from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
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
    const {
      includeStackTrace
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => {
        }}
      >
        <SafeAreaView
          forceInset={{ top: 'always', vertical: 'always' }}
          style={{flex: 1}}
        >
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="padding"
            enabled
          >
            <DevTool
              includeStackTrace={includeStackTrace}
              onClose={() => {
                events.publish('HIDE_DEVTOOLS');
              }}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    )
  }
}

export default Events;
