import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Clipboard,
} from 'react-native';
import Tab from './Tab';
import Console from './Console';
import Requests from './Requests';
import Storage from './Storage';
import log from '../../log';
import network from '../../network';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DevTool = ({
  style,
  includeStackTrace,
  onClose,
  showNetwork = true,
  showStorage = true,
  showConsole = true,
  additionalTools = [],
}) => {
  const views = [];

  if (showConsole) {
    views.push({
      name: 'Console',
      view: <Console includeStackTrace={includeStackTrace} />,
      getData: log.get,
    });
  }

  if (showNetwork) {
    views.push({
      name: 'Network',
      view: <Requests />,
      getData: network.get,
    });
  }

  if (showStorage) {
    views.push({
      name: 'Storage',
      view: <Storage />,
    });
  }

  additionalTools.forEach(tool => {
    views.push(tool);
  });

  const getData = async () => {
    const result = {};
    for (let i = 0; i < views.length; i++) {
      const view = views[i];

      if (view.getData) {
        result[view.name] = await view.getData();
      }
    };

    Clipboard.setString(JSON.stringify(result, null, '  '));
    Alert.alert(
      'Copied to clipboard',
    );
  }

  return (
    <View style={style || styles.container}>
      <Tab
        tabs={views}
        onClose={onClose}
        onDownload={getData}
      />
    </View>
  );
};

export default DevTool;
