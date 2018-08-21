import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Tab from './Tab';
import Console from './Console';
import Requests from './Requests';
import Storage from './Storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DevTool = ({
  style,
  includeStackTrace,
  onClose,
}) => (
  <View style={style || styles.container}>
    <Tab
      tabs={[{
        name: 'Console',
        view: <Console includeStackTrace={includeStackTrace} />,
      }, {
        name: 'Network',
        view: <Requests />,
      }, {
        name: 'Storage',
        view: <Storage />,
      }]}
      onClose={onClose}
    />
  </View>
);

export default DevTool;
