import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import network from '../../../network';
import useRequests from '../../data/requests';
import Toolbar, {
  Button,
  Seperator,
} from '../../base/Toolbar';
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
let i = 0;
const Console = () => {
  const requests = useRequests();
  const [active, setActive] = useState();
  const selected = active >= 0 ? requests[active] : undefined;
  return (
    <View style={styles.container}>
      <Toolbar>
        <Seperator />
        <Button
          name="Clear"
          icon="trash"
          onPress={() => network.clear()}
        />
      </Toolbar>
      <List
        selected={selected ? selected.id : undefined}
        requests={requests}
        onSelect={(i) => setActive(i)}
      />
      {selected && <Details {...selected} />}
    </View>
  );
}

export default Console;
