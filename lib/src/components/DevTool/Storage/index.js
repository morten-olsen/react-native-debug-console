import React from 'react';
import styled from 'styled-components/native';
import {
  Clipboard,
  Alert,
} from 'react-native';
import Storage from '../../data/Storage';
import State from '../../data/State';
import Toolbar from '../../base/Toolbar';
import Keys from './Keys';
import Value from './Value';

const Wrapper = styled.View`
  flex: 1;
`;

const StorageView = ({
}) => (
  <State>
    {({ selected }, setState) => (
      <Storage>
        {(data, update, removeItem, clear) => (
          <Wrapper>
            <Toolbar
              items={[{
                name: 'Download',
                icon: 'download',
                onPress: () => {
                  Clipboard.setString(JSON.stringify(data, null, '  '));
                  Alert.alert(
                    'Copied to clipboard',
                  );
                },
              }, {
                name: 'Refresh',
                icon: 'reload',
                onPress: update,
              }, {
                name: 'Clear',
                icon: 'trash',
                onPress: clear,
              }, {
                name: 'Delete',
                icon: 'remove',
                disabled: !selected,
                onPress: () => removeItem(selected),
              }]}
            />
            <Keys
              selected={selected}
              onSelect={(key) => setState({ selected: key })}
              keys={Object.keys(data)}
            />
            {selected && data[selected] && (
              <Value value={data[selected]} />
            )}
          </Wrapper>
        )}
      </Storage>
    )}
  </State>
);

export default StorageView;
