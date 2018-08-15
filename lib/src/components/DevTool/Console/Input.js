import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import State from '../../data/State';
import log from '../../../log';

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontFamily: 'Menlo-Regular',
  },
});

const Input = ({
  logs,
}) => (
  <State>
    {({
      text = '',
    }, setState) => (
      <View style={styles.container}>
        <TextInput
          multiline
          style={styles.input}
          value={text}
          onChangeText={text => setState({ text })}
        />
        <Button
          title="eval"
          onPress={() => {
            const fn = new Function(text);
            try {
              const response = fn();
              log.info([response]);
              setState({
                text: '',
              });
            } catch (err) {
              log.error([err]);
            }
          }}
        />
      </View>
    )}
  </State>
);

export default Input;
