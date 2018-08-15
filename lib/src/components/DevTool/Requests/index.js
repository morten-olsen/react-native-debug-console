import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import State from '../../data/State';
import Network from '../../data/Network';
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
