import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import State from '../data/State';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 4,
    borderColor: '#2980b9',
  },
});

const Console = ({
  tabs,
}) => (
  <View style={styles.container}>
    <State
      initState={{
        active: 0,
      }}
    >
    {({ active }, setState) => (
      <Fragment>
        <View style={styles.tabs}>
          {tabs.map(({ name }, i) => (
            <TouchableOpacity
              key={name}
              style={active === i ? styles.tabActive : styles.tabInactive}
              onPress={() => {
                setState({ active: i });
              }}
            >
              <Text>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {tabs[active] && tabs[active].view}
      </Fragment>
    )}
    </State>
  </View>
);

Console.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};

Console.defaultProps = {
  tabs: [],
};

export default Console;
