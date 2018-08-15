import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Log from '../../data/Log';
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
        <Output logs={logs} includeStackTrace={includeStackTrace} />
        <Input />
      </View>
    )}
  </Log>
);

export default Console;
