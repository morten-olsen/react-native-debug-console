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
  includeStackTrace
}) => (
  <View style={style || styles.container}>
    <Tab
      tabs={[{
        name: 'Console',
        view: <Console includeStackTrace={includeStackTrace} />,
      }, {
        name: 'Network',
        view: <Requests />,
      }]}
    />
  </View>
);

export default DevTool;
