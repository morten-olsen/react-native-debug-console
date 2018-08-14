import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {
  DevTool,
  DevToolModal,
  log,
  network,
  show,
} from 'react-native-debug-console';

network.attach();
log.attach();

console.log('fooo');

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
          <Button
            style={styles.button}
            title="Console log"
            onPress={() => {
              console.log('hello');
            }}
          />
          <View style={{ height: 10 }} />
          <Button
            title="GET XHR"
            style={styles.button}
            onPress={() => {
              const xhr = new XMLHttpRequest();
              xhr.open('GET', 'https://google.com');
              xhr.send();
            }}
          />
          <View style={{ height: 10 }} />
          <Button
            title="POST XHR"
            style={styles.button}
            onPress={() => {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', 'https://google.com');
              xhr.setRequestHeader('content-type', 'application/json');
              xhr.send(JSON.stringify({
                hello: 'world',
              }));
            }}
          />
          <View style={{ height: 10 }} />
          <Button
            title="Break"
            style={styles.button}
            onPress={() => {
              const err = new Error('some error');
              throw err;
            }}
          />
          <View style={{ height: 30 }} />
          <Button
            title="Show"
            style={styles.button}
            onPress={() => {
              show();
            }}
          />
          <View style={{ flex: 1 }} />
          <DevTool
            style={{
              height: 300,
            }}
          />
          <DevToolModal />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  wrapper: {
    marginTop: 50,
    flex: 1,
  },
  button: {
    margin: 100,
  },
});
