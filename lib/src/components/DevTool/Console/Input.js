import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import State from '../../data/State';
import log from '../../../log';
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
  logs,
}) => (
  <State>
    {({
      text = '',
      history = [],
      historyOffset,
    }, setState) => (
      <View style={styles.container}>
        <Button
          onPress={() => {
            let currentOffset = typeof historyOffset === 'undefined' ? -1 : historyOffset;
            currentOffset += 1;
            const index = history.length - 1 - currentOffset;
            if (history[index]) {
              setState({
                text: history[index],
                historyOffset: currentOffset,
              });
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
              setState({
                text: history[index],
                historyOffset: currentOffset,
              });
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
          onChangeText={text => setState({ text })}
        />
        <Button
          onPress={() => {
            const newHistory = [...history, text];
            const contextKeys = Object.keys(log.context);
            const contextValues = Object.values(log.context);
            const fn = new Function(...contextKeys, text);
            try {
              fn(...contextValues);
              setState({
                text: '',
                history: newHistory,
                historyOffset: undefined,
              });
            } catch (err) {
              log.error([err]);
            }
          }}
        >
          <Icon name="play" />
        </Button>
      </View>
    )}
  </State>
);

export default Input;
