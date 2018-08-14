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

const Console = () => (
  <Log>
    {({ logs }) => (
      <View style={styles.container}>
        <Output logs={logs} />
        <Input />
      </View>
    )}
  </Log>
);

export default Console;
