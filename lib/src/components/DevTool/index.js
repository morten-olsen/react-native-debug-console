import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Tab from './Tab';
import Console from './Console';
import Requests from './Requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DevTool = ({
  style,
}) => (
  <View style={style || styles.container}>
    <Tab
      tabs={[{
        name: 'console',
        view: <Console />,
      }, {
        name: 'network',
        view: <Requests />,
      }]}
    />
  </View>
);

export default DevTool;
