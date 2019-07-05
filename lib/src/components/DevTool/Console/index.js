import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import log from '../../../log';
import useLog from '../../data/log';
import Toolbar, {
  Button,
  Selector,
  Seperator,
} from '../../base/Toolbar';
import Output from './Output';
import Input from './Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const initFilters = [
  'error',
  'warn',
  'info',
  'debug',
].map(i => ({
  name: i,
  value: i,
  selected: true,
}))

const Console = ({
  includeStackTrace,
}) => {
  const logs = useLog();
  const [filters, setFilters] = useState(initFilters);
  return (
    <View style={styles.container}>
      <Toolbar>
        <Selector
          name="Filter"
          icon="filter"
          options={filters}
          multiSelect
          onSelect={(selected) => {
            setFilters([...selected]);
          }}
        />
        <Seperator />
        <Button
          name="Clear"
          icon="trash"
          onPress={() => log.clear()}
        />
      </Toolbar>
      <Output filter={filters.filter(f => f.selected).map(f => f.name)} logs={logs} includeStackTrace={includeStackTrace} />
      <Input />
    </View>
  );
};

export default Console;
