import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import { createContext } from '../../../console';
import Icon from '../../base/Icon';

const Button = styled.TouchableOpacity`
  padding: 12px 8px;
`;

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Menlo-Regular',
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },
});

const Input = ({
  provider,
  logs,
}) => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [historyOffset, setHistoryOffset] = useState(); 
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          let currentOffset = typeof historyOffset === 'undefined' ? -1 : historyOffset;
          currentOffset += 1;
          const index = history.length - 1 - currentOffset;
          if (history[index]) {
            setText(history[index]);
            setHistoryOffset(currentOffset);
          }
        }}
      >
        <Icon name="left" />
      </Button>
      <Button
        title=">"
        onPress={() => {
          let currentOffset = typeof historyOffset === 'undefined' ? -1 : historyOffset;
          currentOffset -= 1;
          const index = history.length - 1 - currentOffset;
          if (history[index]) {
            setText(history[index]);
            setHistoryOffset(currentOffset);
          }
        }}
      >
        <Icon name="right" />
      </Button>
      <TextInput
        multiline
        placeholder="{your code here}"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button
        onPress={() => {
          const newHistory = [...history, text];
          const context = createContext({
            logProvider: provider,
          });
          const contextKeys = Object.keys(context);
          const contextValues = Object.values(context);
          const fn = new Function(...contextKeys, text);
          try {
            fn(...contextValues);
            setText('');
            setHistoryOffset(undefined);
            setHistory(newHistory);
          } catch (err) {
            provider.error([err]);
          }
        }}
      >
        <Icon name="play" />
      </Button>
    </View>
  );
};

export default Input;
