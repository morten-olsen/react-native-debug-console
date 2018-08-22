import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import log from '../../../log';
import Log from '../../data/Log';
import State from '../../data/State';
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
}) => (
  <Log>
    {({ logs }) => (
      <State
        initState={{
          filters: initFilters,
        }}
      >
        {({ filters }, setState) => (
          <View style={styles.container}>
            <Toolbar>
              <Selector
                name="Filter"
                icon="filter"
                options={filters}
                multiSelect
                onSelect={(selected) => {
                  setState({
                    filters: selected,
                  });
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
        )}
      </State>
    )}
  </Log>
);

export default Console;
