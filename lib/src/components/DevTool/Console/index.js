import React from 'react';
import {
  StyleSheet,
  Clipboard,
  Alert,
  View,
} from 'react-native';
import log from '../../../log';
import Log from '../../data/Log';
import Toolbar from '../../base/Toolbar';
import Output from './Output';
import Input from './Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Console = ({
  includeStackTrace,
}) => (
  <Log>
    {({ logs }) => (
      <View style={styles.container}>
        <Toolbar
          items={[{
            name: 'Download',
            icon: 'download',
            onPress: () => {
              Clipboard.setString(JSON.stringify(logs, null, '  '));
              Alert.alert(
                'Copied to clipboard',
              );
            },
          }, {
            name: 'Clear',
            icon: 'trash',
            onPress: () => log.clear(),
          }]}
        />
        <Output logs={logs} includeStackTrace={includeStackTrace} />
        <Input />
      </View>
    )}
  </Log>
);

export default Console;
