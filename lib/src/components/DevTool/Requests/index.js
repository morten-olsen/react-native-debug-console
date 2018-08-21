import React from 'react';
import {
  StyleSheet,
  View,
  Clipboard,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import network from '../../../network';
import State from '../../data/State';
import Network from '../../data/Network';
import Toolbar from '../../base/Toolbar';
import Details from './Details';
import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  details: {
    flex: 1,
  },
});

const Console = () => (
  <State>
    {({
      active,
    }, setState) => (
      <Network>
        {({ requests }) => {
          const selected = active >= 0 ? requests[active] : undefined;
          return (
            <View style={styles.container}>
              <Toolbar
                items={[{
                  name: 'Download',
                  icon: 'download',
                  onPress: () => {
                    Clipboard.setString(JSON.stringify(requests, null, '  '));
                    Alert.alert(
                      'Copied to clipboard',
                    );
                  },
                }, {
                  name: 'Clear',
                  icon: 'trash',
                  onPress: () => network.clear(),
                }]}
              />
              <List
                selected={selected ? selected.id : undefined}
                requests={requests}
                onSelect={(i) => setState({ active: i })}
              />
              {selected && <Details {...selected} />}
            </View>
          );
        }}
      </Network>
    )}
  </State>
);

export default Console;
