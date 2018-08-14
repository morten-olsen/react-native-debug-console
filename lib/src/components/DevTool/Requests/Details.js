import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Tab from '../Tab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Data = ({
  url,
  method,
  status,
  args = [],
}) => (
  <ScrollView style={styles.container}>
    <View>
      <Text>Status: {status}</Text>
      <Text>Method: {method}</Text>
      <Text>Url: {url}</Text>
      <Text>Request Body:</Text>
      {args[0] && (
        <Text>{args[0].toString()}</Text>
      )}
    </View>
  </ScrollView>
);

const Response = ({
  request,
}) => (
  <ScrollView style={styles.container}>
    <View>
      <Text>Response: {request.responseText}</Text>
    </View>
  </ScrollView>
);


const RequestDetails = (props) => (
  <Tab
    tabs={[{
      name: 'overview',
      view: <Data {...props} />
    }, {
      name: 'response',
      view: <Response {...props} />
    }]}
  />
);

export default RequestDetails;
