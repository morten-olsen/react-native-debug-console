import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  method: {
    padding: 5,
  },
  url: {
    flex: 1,
    padding: 5,
  },
  status: {
    padding: 5,
  },
});

const RequestDetails = ({
  requests,
  onSelect,
}) => (
  <ScrollView style={styles.container}>
    <View>
      {requests.map(({
        status,
        method,
        url,
      }, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onSelect(i)}
        >
          <View style={styles.row}>
            <Text style={styles.method}>{method}</Text>
            <Text style={styles.url}>{url}</Text>
            <Text style={styles.status}>{status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default RequestDetails;
