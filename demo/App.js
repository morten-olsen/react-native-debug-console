import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import {
  DevTool,
  DevToolModal,
  log,
  network,
  show,
  context,
} from 'react-native-debug-console';

network.attach();
log.attach(true);
context.hello = () => 'earth';

console.log('fooo');
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://google.com');
xhr.send();
xhr = new XMLHttpRequest();
xhr.open('GET', 'https://google.com/sdfsfsdfsfdf');
xhr.send();


console.log({
  hello: {
    world: 1,
    earth: 2,
  },
});

AsyncStorage.setItem('a', 'b');
AsyncStorage.setItem('b', 'c');
AsyncStorage.setItem('c', 'd');

const t = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error('everything is broken');
  }, 1000);
});



export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
          <View>
            <Button
              style={styles.button}
              title="console.log('hello')"
              onPress={() => {
                console.log('hello');
              }}
            />
            <View style={{ height: 10 }} />
            <Button
              title="GET XHR (html)"
              style={styles.button}
              onPress={() => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://google.com');
                xhr.send();
              }}
            />
            <View style={{ height: 10 }} />
            <View style={{ height: 10 }} />
            <Button
              title="GET XHR (json)"
              style={styles.button}
              onPress={() => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://api.github.com');
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
              title="Unhandled error"
              style={styles.button}
              onPress={() => {
                const err = new Error('some error');
                throw err;
              }}
            />
            <View style={{ height: 30 }} />
            <Button
              title="Show modal"
              style={styles.button}
              onPress={() => {
                show();
              }}
            />
            <View style={{ height: 10 }} />
          </View>
          <DevTool
            style={{
              flex: 1,
            }}
          />
          <DevToolModal storage={AsyncStorage} />
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
