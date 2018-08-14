import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import JSONTree from 'react-native-json-tree'
import prune from './tools';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const getCircularReplacer = () => {
  const seen = [];
  return (key, val) => {
    if (val != null && typeof val == "object") {
      if (seen.indexOf(val) >= 0) {
        return;
      }
      seen.push(val);
    }
    return val;
  }
};

const formatData = (data) => {
  if (typeof data === 'undefined') {
    return <Text>undefined</Text>;
  }
  if (data instanceof Error) {
    return <Text>Error {data.toString()} {data.stack.toString()}</Text>;
  }
  if (typeof data === 'object') {
    return <JSONTree data={prune(data, null, '  ')} />
  }
  return <Text>{data.toString()}</Text>;
}

const Console = ({
  logs,
}) => (
  <ScrollView style={styles.container}>
    <View>
      {logs.map((log, i) => (
        <View key={i}>
          <Text>
            {log.type}
          </Text>
          {formatData(log.data)}
        </View>
      ))}
    </View>
  </ScrollView>
);

export default Console;
